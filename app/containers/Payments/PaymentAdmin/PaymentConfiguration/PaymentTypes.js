import React from 'react';
import PropTypes from 'prop-types';
import { PaymentTypesTable } from 'components/payments';
import { ButtonCustom } from 'components/commons';
import { connect } from 'react-redux';
import {} from 'components/form';
import { paymentMethod, paymentSelect, paymentEnum } from 'constantsApp';

import {
  getPaymentConfigByType,
  createPaymentConfigMethod,
  modifyPaymentConfigMethod,
} from '../../actions';
class PaymentTypes extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethods: [],
      paymentValues: paymentSelect.paymentMethod,
      rowEditItem: null,
      rowSelectedItem: null,
      newItem: null,
    };
    this.lastIndex = 0;
    this.isEmptyListServer = true;
    this.paymentMethodsOrigin = [];
  }

  componentDidMount = () => {
    this.props.getPaymentConfigByType(
      paymentEnum.paymentConfig.PAYMENT_METHODS,
      ({ response }) => {
        this.convertResponsePaymentConfig(response);
      },
    );
  };
  convertResponsePaymentConfig = response => {
    if (
      response &&
      response.paymentMethods &&
      response.paymentMethods.length > 0
    ) {
      this.isEmptyListServer = false;
      this.getLastIndex(response.paymentMethods);
      this.paymentMethodsOrigin = [...response.paymentMethods];

      this.setState({
        paymentMethods: response.paymentMethods,
        paymentValues: paymentSelect.paymentMethod.filter(el =>
          response.paymentMethods.every(subEl => subEl.method !== el.value),
        ),
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
  handleApplyBtn = async () => {
    this.setState({ applying: true });
    const { paymentMethods } = this.state;
    const resultMethods = paymentMethods.map(el => ({
      index: el.index,
      method: el.method,
    }));

    const listRemoveMethod = this.paymentMethodsOrigin
      .filter(el => !resultMethods.some(subEl => subEl.index === el.index))
      .map(el => ({ index: el.index }));
    const dataMethods = {
      paymentConfigType: paymentEnum.paymentConfig.PAYMENT_METHODS,
      paymentMethods: resultMethods.concat(listRemoveMethod),
    };
    if (this.isEmptyListServer) {
      await this.props.createPaymentConfigMethod(
        dataMethods,
        ({ success, response }) => {
          if (success) {
            this.convertResponsePaymentConfig(response);
          }
          this.setState({
            applying: false,
          });
        },
      );
    } else {
      await this.props.modifyPaymentConfigMethod(
        dataMethods,
        ({ success, response }) => {
          if (success) {
            this.convertResponsePaymentConfig(response);
          }
          this.setState({
            applying: false,
          });
        },
      );
    }
  };

  onSelectActionTableRow = rowSelectedItem => {
    if (this.state.rowSelectedItem === rowSelectedItem) {
      this.setState({ rowSelectedItem: null });
      return;
    }
    if (this.state.rowEditItem !== rowSelectedItem) {
      this.setState({ rowSelectedItem, rowEditItem: null });
    } else {
      this.setState({ rowSelectedItem });
    }
  };

  onChangeNewValue = (type, val) => {
    this.setState({
      newItem: val,
    });
  };

  handleClickAddNewRecord = () => {
    const { newItem } = this.state;

    const newRecord = paymentMethod.find(e => e.method === newItem.value);
    if (newRecord) {
      this.setState(pre => ({
        newItem: null,
        paymentValues: pre.paymentValues.filter(e => e.value !== newItem.value),
        paymentMethods: [
          ...pre.paymentMethods,
          { ...newRecord, index: this.lastIndex + 1 },
        ],
      }));
      this.lastIndex += 1;
    }
  };

  handleClickRemoveRecord = () => {
    const { rowSelectedItem, paymentMethods } = this.state;
    this.getLastIndex(paymentMethods.filter(e => e !== rowSelectedItem));
    this.setState(pre => ({
      rowSelectedItem: null,
      paymentValues: [
        ...pre.paymentValues,
        {
          label: pre.rowSelectedItem.method,
          value: pre.rowSelectedItem.method,
        },
      ],
      paymentMethods: pre.paymentMethods.filter(e => e !== pre.rowSelectedItem),
    }));
  };

  render() {
    const {
      rowSelectedItem,
      newItem,
      paymentValues,
      paymentMethods,
      applying,
    } = this.state;

    return (
      <div>
        <PaymentTypesTable
          data={paymentMethods}
          onSelectTableRow={this.onSelectActionTableRow}
          rowSelectedItem={rowSelectedItem}
          handleClickAddNewRecord={this.handleClickAddNewRecord}
          handleClickRemoveRecord={this.handleClickRemoveRecord}
          onChangeNewValue={this.onChangeNewValue}
          newItem={newItem}
          options={paymentValues}
        />
        <div className="pull-right mt-4 mb-4">
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

PaymentTypes.propTypes = {
  getPaymentConfigByType: PropTypes.func,
  modifyPaymentConfigMethod: PropTypes.func,
  createPaymentConfigMethod: PropTypes.func,
};
export default connect(
  null,
  {
    getPaymentConfigByType,
    createPaymentConfigMethod,
    modifyPaymentConfigMethod,
  },
)(PaymentTypes);
