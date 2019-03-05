import React, { Component } from 'react';
import { ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { FormGroup, FormAbstract, FormPanel } from 'components/form';
import { dataSelect } from 'constantsApp';
import { ButtonCustom, InputValidate } from 'components/commons';
import { ModalPaymentProfile } from 'components/modals';

class Billing extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      parentId: '',
      billingDom: '',
      billingSegment: '',
      billingFrequency: null,
      invoiceType: null,
      invoiceDelivery: null,
      paymentProfileId: '',
      openModalPayment: false,
    };
  }

  componentDidMount() {
    if (this.props.billing) {
      this.initVal(this.props.billing);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.billing !== nextProps.billing) {
      this.initVal(nextProps.billing);
    }
  }

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onClickCancel = () => {
    this.initVal(this.props.billing);
  };

  onSelectPayment = id => {
    this.setState({ paymentProfileId: id });
  };

  toggleModalPayment = () => {
    this.setState(preState => ({
      openModalPayment: !preState.openModalPayment,
    }));
  };

  initVal = billing => {
    this.setState({
      id: billing.id,
      parentId: billing.parentId || '',
      billingDom: billing.billingDom || '',
      billingSegment: billing.billingSegment || '',
      billingFrequency: billing.billingFrequency
        ? dataSelect.billingFrequency.find(
          el => el.value === billing.billingFrequency,
        )
        : null,
      invoiceType: billing.invoiceType
        ? dataSelect.invoiceType.find(el => el.value === billing.invoiceType)
        : null,
      invoiceDelivery: billing.invoiceDelivery
        ? dataSelect.invoiceDelivery.find(
          el => el.value === billing.invoiceDelivery,
        )
        : null,
      paymentProfileId: billing.paymentProfileId || '',
    });
  };

  onHandleUpdateAccount = evt => {
    evt.preventDefault();
    const {
      id,
      parentId,
      billingDom,
      billingSegment,
      billingFrequency,
      invoiceType,
      invoiceDelivery,
      paymentProfileId,
    } = this.state;

    const accountDataPost = {
      id: this.props.accountId,
      billingProfiles: [
        {
          id,
          parentId,
          billingDom,
          billingSegment,
          billingFrequency: billingFrequency ? billingFrequency.value : null,
          invoiceType: invoiceType ? invoiceType.value : null,
          invoiceDelivery: invoiceDelivery ? invoiceDelivery.value : null,
          paymentProfileId,
        },
      ],
    };
    this.props.modifyAccount(accountDataPost, ({ success }) => {
      console.log('update contacts', success);
    });
  };

  render() {
    const {
      id,
      parentId,
      billingDom,
      billingSegment,
      billingFrequency,
      invoiceType,
      invoiceDelivery,
      paymentProfileId,
      openModalPayment,
    } = this.state;
    const { paymentProfiles, disableModify } = this.props;
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
              <FormGroup title="Parent Id">
                <input
                  type="text"
                  placeholder="Parent Id"
                  name="parentId"
                  value={parentId}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Billing Dom">
                <input
                  type="number"
                  placeholder="Billing Dom"
                  name="billingDom"
                  value={billingDom}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Billing Segment">
                <input
                  type="text"
                  placeholder="Billing Segment"
                  name="billingSegment"
                  value={billingSegment}
                  onChange={this.onChangeText}
                  disabled={disableModify}
                />
              </FormGroup>
            </div>
            <div className="form__half">
              <FormGroup title="Billing Frequency">
                <Select
                  value={billingFrequency}
                  options={dataSelect.billingFrequency}
                  placeholder="Billing Frequency"
                  onChange={val => this.onChangeSelect('billingFrequency', val)}
                  className="form__form-group-select"
                  isDisabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Invoice Type">
                <Select
                  value={invoiceType}
                  options={dataSelect.invoiceType}
                  placeholder="Invoice Type"
                  onChange={val => this.onChangeSelect('invoiceType', val)}
                  className="form__form-group-select"
                  isDisabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Invoice Delivery">
                <Select
                  value={invoiceDelivery}
                  options={dataSelect.invoiceDelivery}
                  placeholder="Invoice Delivery"
                  onChange={val => this.onChangeSelect('invoiceDelivery', val)}
                  className="form__form-group-select"
                  isDisabled={disableModify}
                />
              </FormGroup>
              <FormGroup title="Payment Profile Id">
                <InputValidate
                  type="text"
                  placeholder="Payment Profile Id"
                  name="paymentProfileId"
                  value={paymentProfileId}
                  onClick={this.toggleModalPayment}
                  disabled={disableModify}
                />
              </FormGroup>
            </div>
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
        <ModalPaymentProfile
          modalTitle="Select Payment Profile"
          openModal={openModalPayment}
          toggleModal={this.toggleModalPayment}
          paymentProfiles={paymentProfiles}
          onSelectPayment={this.onSelectPayment}
          paymentSelectedId={paymentProfileId}
        />
      </FormPanel>
    );
  }
}

Billing.propTypes = {
  billing: PropTypes.object,
  modifyAccount: PropTypes.func,
  accountId: PropTypes.string,
  paymentProfiles: PropTypes.array,
  disableModify: PropTypes.bool,
};

export default Billing;
