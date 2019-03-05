import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormAbstract, FormGroup } from 'components/form';
import { ButtonCustom, InputValidate } from 'components/commons';
import { dataSelect } from 'constantsApp';

class ModalAddPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      paymentTerm: null,
      paymentMethod: null,
    };
  }

  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onHandleAddPayment = evt => {
    evt.preventDefault();
    const { id, paymentTerm, paymentMethod } = this.state;
    const dataPayment = {
      id,
      paymentMethod: paymentMethod.value,
      paymentTerm: paymentTerm.value,
    };
    console.log('onHandleAddPayment: ', dataPayment);
  };

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
      id: '',
      paymentTerm: null,
      paymentMethod: null,
    });
  };

  render() {
    const { openModal, modalTitle } = this.props;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => this.toggleModal()}
        size="lg"
        className={classNames('modal-custom')}
      >
        <ModalHeader toggle={() => this.toggleModal()}>
          {modalTitle}
        </ModalHeader>
        <ModalBody>
          <FormAbstract onSubmit={this.onHandleAddPayment}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Id">
                      <InputValidate
                        name="id"
                        type="text"
                        disabled
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Payment Term">
                      <Select
                        options={dataSelect.paymentTerm}
                        placeholder="Payment Term"
                        onChange={val =>
                          this.onChangeSelect('paymentTerm', val)
                        }
                        className="form__form-group-select"
                      />
                    </FormGroup>
                    <FormGroup title="Payment Method">
                      <Select
                        options={dataSelect.paymentMethod.map(
                          (item, index) => ({
                            value: item.value,
                            label: item.label,
                            isDisabled: index === 1,
                          }),
                        )}
                        placeholder="Payment Method"
                        onChange={val =>
                          this.onChangeSelect('paymentMethod', val)
                        }
                        className="form__form-group-select"
                      />
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <button
                      type="button"
                      disabled
                      className="btn btn-success form-section__btn-add form-section__btn-add-input"
                      onClick={() => {}}
                    >
                      Add Credit Card
                    </button>
                  </div>
                </div>
              </section>
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
            onClick={evt => this.onHandleAddPayment(evt)}
          />
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAddPayment.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default ModalAddPayment;
