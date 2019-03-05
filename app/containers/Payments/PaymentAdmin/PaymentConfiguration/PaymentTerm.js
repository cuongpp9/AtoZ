import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PaymentTermsTable } from 'components/payments';
import { ButtonCustom } from 'components/commons';
import { paymentEnum } from 'constantsApp';
import {
  getPaymentConfigByType,
  createPaymentConfigTerm,
  modifyPaymentConfigTerm,
} from '../../actions';
class PaymentTerms extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      rowSelectedItem: null,
      newItem: {},
      applying: false,
      paymentTerms: [],
    };
    this.lastIndex = 0;
    this.isEmptyListServer = true;
    this.paymentTermsOrigin = [];
  }

  componentDidMount = () => {
    this.props.getPaymentConfigByType(
      paymentEnum.paymentConfig.PAYMENT_TERMS,
      ({ response }) => {
        this.convertResponsePaymentConfig(response);
      },
    );
  };

  convertResponsePaymentConfig = response => {
    if (response && response.paymentTerms && response.paymentTerms.length > 0) {
      this.isEmptyListServer = false;
      this.getLastIndex(response.paymentTerms);
      this.paymentTermsOrigin = [...response.paymentTerms];
      this.setState({
        paymentTerms: response.paymentTerms,
      });
    }
  };

  getLastIndex = array => {
    array.forEach(item => {
      if (item && item.index > this.lastIndex) {
        this.lastIndex = item.index;
      }
    });
  };

  onSelectActionTableRow = rowSelectedItem => {
    if (this.state.rowSelectedItem === rowSelectedItem) {
      this.setState({ rowSelectedItem: null });
    } else {
      this.setState({ rowSelectedItem });
    }
  };

  updateRowValuePaymentTerm = (idx, type, val) => {
    try {
      const { paymentTerms } = this.state;
      paymentTerms[idx][type] = val;

      this.setState({
        paymentTerms: [...paymentTerms],
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChangeNewValue = (type, val) => {
    try {
      const { newItem } = this.state;
      newItem[type] = val;

      this.setState({
        newItem: { ...newItem },
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleApplyBtn = async () => {
    const { paymentTerms } = this.state;
    this.setState({ applying: true });
    const resultTerms = paymentTerms.map(el => ({
      index: el.index,
      paymentTerm: el.paymentTerm,
      offset: el.offset,
      days: '1',
      paymentWorkingDay: el.paymentWorkingDay,
    }));

    const listRemoveTerm = this.paymentTermsOrigin
      .filter(el => !resultTerms.some(subEl => subEl.index === el.index))
      .map(el => ({ index: el.index }));
    const dataTerms = {
      paymentConfigType: paymentEnum.paymentConfig.PAYMENT_TERMS,
      paymentTerms: resultTerms.concat(listRemoveTerm),
    };
    if (this.isEmptyListServer) {
      await this.props.createPaymentConfigTerm(
        dataTerms,
        ({ success, response }) => {
          if (success) {
            this.convertResponsePaymentConfig(response);
          }
          this.setState({ applying: false });
        },
      );
    } else {
      await this.props.modifyPaymentConfigTerm(
        dataTerms,
        ({ success, response }) => {
          if (success) {
            this.convertResponsePaymentConfig(response);
          }
          this.setState({ applying: false });
        },
      );
    }
  };

  handleClickAddNewRecord = () => {
    const { newItem } = this.state;

    this.setState(pre => ({
      newItem: { offset: '', days: '' },
      paymentTerms: [
        ...pre.paymentTerms,
        { ...newItem, index: this.lastIndex + 1 },
      ],
    }));
    this.lastIndex += 1;
  };

  handleClickRemoveRecord = () => {
    const { rowSelectedItem, paymentTerms } = this.state;
    this.getLastIndex(paymentTerms.filter(e => e !== rowSelectedItem));
    this.setState(pre => ({
      rowSelectedItem: null,
      paymentTerms: pre.paymentTerms.filter(e => e !== pre.rowSelectedItem),
    }));
  };

  render() {
    const { rowSelectedItem, newItem, applying, paymentTerms } = this.state;

    return (
      <div>
        <PaymentTermsTable
          data={paymentTerms}
          onSelectTableRow={this.onSelectActionTableRow}
          rowSelectedItem={rowSelectedItem}
          handleClickAddNewRecord={this.handleClickAddNewRecord}
          handleClickRemoveRecord={this.handleClickRemoveRecord}
          updateActionRowValue={this.updateRowValuePaymentTerm}
          onChangeNewValue={this.onChangeNewValue}
          newItem={newItem}
        />
        <div className="pull-right mt-4 mb-4 ">
          <ButtonCustom
            loading={applying}
            className="btn btn-primary"
            type="button"
            title="Apply"
            titleloading="Applying"
            onClick={this.handleApplyBtn}
          />
        </div>
      </div>
    );
  }
}

PaymentTerms.propTypes = {
  createPaymentConfigTerm: PropTypes.func,
  modifyPaymentConfigTerm: PropTypes.func,
  getPaymentConfigByType: PropTypes.func,
};
export default connect(
  null,
  {
    getPaymentConfigByType,
    createPaymentConfigTerm,
    modifyPaymentConfigTerm,
  },
)(PaymentTerms);
