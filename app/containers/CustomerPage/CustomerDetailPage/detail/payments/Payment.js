import React, { Component } from 'react';
import { ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, FormAbstract, FormPanel } from 'components/form';
import { dataSelect } from 'constantsApp';
import { ButtonCustom, InputValidate } from 'components/commons';

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      paymentTerm: null,
      paymentMethod: null,
    };
  }

  componentDidMount() {
    if (this.props.payment) {
      this.initVal(this.props.payment);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.payment !== nextProps.payment) {
      this.initVal(nextProps.payment);
    }
  }

  initVal = payment => {
    this.setState({
      id: payment.id,
      paymentTerm: payment.paymentTerm
        ? dataSelect.paymentTerm.find(el => el.value === payment.paymentTerm)
        : null,
      paymentMethod: payment.paymentMethod
        ? dataSelect.paymentMethod.find(
          el => el.value === payment.paymentMethod,
        )
        : null,
    });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onHandleUpdateAccount = evt => {
    evt.preventDefault();

    const { id, paymentTerm, paymentMethod } = this.state;
    const accountDataPost = {
      id: this.props.accountId,
      paymentProfiles: [
        {
          id,
          paymentMethod: paymentMethod.value,
          paymentTerm: paymentTerm.value,
        },
      ],
    };
    this.props.modifyAccount(accountDataPost, ({ success }) => {
      console.log('update payment profiles', success);
    });
  };

  render() {
    const { id, paymentTerm, paymentMethod } = this.state;
    const { disableModify } = this.props;
    return (
      <FormPanel title="" className="customer-field">
        <FormAbstract onSubmit={this.onHandleUpdateAccount}>
          <div className="form-inner">
            <div className="form__half">
              <FormGroup title="Id">
                <InputValidate
                  name="id"
                  type="text"
                  value={id}
                  disabled
                  onChange={this.onChangeText}
                />
              </FormGroup>
              <FormGroup title="Payment Term">
                <Select
                  value={paymentTerm}
                  options={dataSelect.paymentTerm}
                  placeholder="Payment Term"
                  onChange={val => this.onChangeSelect('paymentTerm', val)}
                  className="form__form-group-select"
                  isDisabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Payment Method">
                <Select
                  value={paymentMethod}
                  options={dataSelect.paymentMethod.map((item, index) => ({
                    value: item.value,
                    label: item.label,
                    isDisabled: index === 2,
                  }))}
                  placeholder="Payment Method"
                  onChange={val => this.onChangeSelect('paymentMethod', val)}
                  className="form__form-group-select"
                  isDisabled={disableModify}
                />
              </FormGroup>
            </div>
            {!disableModify && (
              <div className="form__half">
                <button
                  type="button"
                  className="btn btn-success form-section__btn-add form-section__btn-add-input"
                  onClick={() => {}}
                >
                  Add Credit Card
                </button>
              </div>
            )}
          </div>
          {!disableModify && (
            <ButtonToolbar className="form-create__btn">
              <ButtonCustom
                loading={false}
                className="btn btn-default m-l"
                type="button"
                title="Cancel"
                onClick={this.handleButtonCancel}
                // disabled={isUpdating}
              />
              <ButtonCustom
                loading={false}
                className="btn btn-primary"
                type="submit"
                title="Modify"
                titleloading="Modifying"
              />
            </ButtonToolbar>
          )}
        </FormAbstract>
      </FormPanel>
    );
  }
}

Payment.propTypes = {
  payment: PropTypes.object,
  modifyAccount: PropTypes.func,
  accountId: PropTypes.string,
  disableModify: PropTypes.bool,
};

export default Payment;
