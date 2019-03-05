import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormAbstract, FormGroup, SelectField } from 'components/form';
import { ButtonCustom, InputValidate } from 'components/commons';
import { dataSelect } from 'constantsApp';
import { ModalPaymentProfile } from 'components/modals';

class ModalAddBilling extends React.Component {
  constructor(props) {
    super(props);
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

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onSelectPayment = paymentProfileId => {
    this.setState({ paymentProfileId });
  };

  toggleModalPayment = () => {
    this.setState(preState => ({
      openModalPayment: !preState.openModalPayment,
    }));
  };

  onHandleAddBilling = evt => {
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

    const dataBlling = {
      id,
      parentId,
      billingDom,
      billingSegment,
      billingFrequency: billingFrequency ? billingFrequency.value : null,
      invoiceType: invoiceType ? invoiceType.value : null,
      invoiceDelivery: invoiceDelivery ? invoiceDelivery.value : null,
      paymentProfileId,
    };
    console.log('onHandleAddBilling: ', dataBlling);
  };

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
      id: '',
      parentId: '',
      billingDom: '',
      billingSegment: '',
      billingFrequency: null,
      invoiceType: null,
      invoiceDelivery: null,
      paymentProfileId: '',
    });
  };

  render() {
    const { openModal, modalTitle, paymentProfiles } = this.props;
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
    const parentModal = openModalPayment;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => this.toggleModal()}
        size="lg"
        className={classNames('modal-custom', {
          'parent-modal': parentModal,
        })}
      >
        <ModalHeader toggle={() => this.toggleModal()}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <FormAbstract onSubmit={this.onHandleAddBilling}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Id">
                      <InputValidate
                        name="id"
                        type="text"
                        value={id}
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
                      />
                    </FormGroup>
                    <FormGroup title="Billing Dom">
                      <input
                        type="number"
                        placeholder="Billing Dom"
                        name="billingDom"
                        value={billingDom}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Billing Segment">
                      <input
                        type="text"
                        placeholder="Billing Segment"
                        name="billingSegment"
                        value={billingSegment}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <FormGroup title="Billing Frequency">
                      <SelectField
                        name={billingFrequency}
                        options={dataSelect.billingFrequency}
                        placeholder="Field Billing Frequency can not be blank"
                        value={billingFrequency}
                        onChange={val =>
                          this.onChangeSelect('billingFrequency', val)
                        }
                        className="form__form-group-select"
                        required
                      />
                    </FormGroup>
                    <FormGroup title="Invoice Type">
                      <SelectField
                        name="invoiceType"
                        options={dataSelect.invoiceType}
                        placeholder="Field Invoice Type can not be blank"
                        value={invoiceType}
                        onChange={val =>
                          this.onChangeSelect('invoiceType', val)
                        }
                        className="form__form-group-select"
                        required
                      />
                    </FormGroup>
                    <FormGroup title="Invoice Delivery">
                      <SelectField
                        name="invoiceDelivery"
                        options={dataSelect.invoiceDelivery}
                        placeholder="Field Invoice Delivery can not be blank"
                        value={invoiceDelivery}
                        onChange={val =>
                          this.onChangeSelect('invoiceDelivery', val)
                        }
                        className="form__form-group-select"
                        required
                      />
                    </FormGroup>
                    <FormGroup title="Payment Profile Id">
                      <InputValidate
                        type="text"
                        placeholder="Field Payment Profile Id  can not be blank"
                        name="paymentProfileId"
                        value={paymentProfileId || ''}
                        onChange={() => {}}
                        onClick={this.toggleModalPayment}
                      />
                    </FormGroup>
                  </div>
                </div>
              </section>
              <ModalPaymentProfile
                modalTitle="Select Payment Profile"
                openModal={openModalPayment}
                toggleModal={this.toggleModalPayment}
                paymentProfiles={paymentProfiles}
                onSelectPayment={this.onSelectPayment}
                paymentSelectedId={paymentProfileId}
              />
            </div>
          </FormAbstract>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            // loading={isPosting}
            className="btn btn-primary"
            type="submit"
            title="Add New"
            titleloading="Modifying"
            onClick={evt => this.onHandleAddBilling(evt)}
          />
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAddBilling.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  paymentProfiles: PropTypes.array,
};

export default ModalAddBilling;
