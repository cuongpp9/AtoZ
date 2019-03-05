import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormAbstract, FormGroup } from 'components/form';
import { ButtonCustom, InputValidate } from 'components/commons';
import { dataSelect } from 'constantsApp';
import FormAddPrice from '../priceOffer/FormAddPrice';
class ModalAddCustomerPricing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: '',
      salesChannel: null,
      marketSegment: null,
      accountType: null,
      accountSubType: null,
      indexPrice: '',
      refIndex: '',
      currencyId: null,
      amount: null,
      isQuantityScalable: false,
    };
  }
  onChangeText = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onChangeSelect = (name, val) => {
    this.setState({ [name]: val });
  };

  onChangePrice = (name, val) => {
    this.setState({ [name]: val });
  };

  onHandleAddSustomerPricing = evt => {
    evt.preventDefault();
    const {
      index,
      salesChannel,
      marketSegment,
      accountType,
      accountSubType,
      indexPrice,
      refIndex,
      currencyId,
      amount,
      isQuantityScalable,
    } = this.state;
    const dataCusPricing = {
      index,
      salesChannel: salesChannel ? salesChannel.value : null,
      marketSegment: marketSegment ? marketSegment.value : null,
      accountType: accountType ? accountType.value : null,
      accountSubType: accountSubType ? accountSubType.value : null,
      prices: [
        {
          index: indexPrice,
          refIndex,
          currencyId: currencyId ? currencyId.value : null,
          amount,
          isQuantityScalable,
        },
      ],
    };
    console.log('onHandleAddSustomerPricing: ', dataCusPricing);
    this.props.onSubmitAdd(evt, dataCusPricing);
  };

  toggleModal = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({
      index: '',
      salesChannel: null,
      marketSegment: null,
      accountType: null,
      accountSubType: null,
      indexPrice: '',
      refIndex: '',
      currencyId: null,
      amount: 0,
      isQuantityScalable: false,
    });
  };

  render() {
    const { openModal, modalTitle, isPosting } = this.props;
    const { index, indexPrice, currencyId, amount } = this.state;
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
          <FormAbstract onSubmit={this.onHandleAddSustomerPricing}>
            <div className="form-section">
              <section className="section">
                <div className="form-content body-modal-add-component">
                  <div className="form__half">
                    <FormGroup title="Index">
                      <InputValidate
                        name="index"
                        type="number"
                        placeholder="Index"
                        value={index}
                        onChange={this.onChangeText}
                      />
                    </FormGroup>
                    <FormGroup title="Sales Channel">
                      <Select
                        name="salesChannel"
                        options={dataSelect.salesChannel}
                        className="form__form-group-select"
                        placeholder="Sales Channel"
                        onChange={val =>
                          this.onChangeSelect('salesChannel', val)
                        }
                      />
                    </FormGroup>
                    <FormGroup title="Market Segment">
                      <Select
                        name="marketSegment"
                        options={dataSelect.marketSegment}
                        placeholder="Market Segment"
                        className="form__form-group-select"
                        onChange={val =>
                          this.onChangeSelect('marketSegment', val)
                        }
                      />
                    </FormGroup>
                  </div>
                  <div className="form__half">
                    <FormGroup title="Account Type">
                      <Select
                        name="accountType"
                        options={dataSelect.accountType}
                        className="form__form-group-select"
                        placeholder="Account Type"
                        onChange={val =>
                          this.onChangeSelect('accountType', val)
                        }
                      />
                    </FormGroup>
                    <FormGroup title="Account SubType">
                      <Select
                        name="accountSubType"
                        options={dataSelect.accountSubType}
                        className="form__form-group-select"
                        placeholder="Account SubType"
                        onChange={val =>
                          this.onChangeSelect('accountSubType', val)
                        }
                      />
                    </FormGroup>
                  </div>
                  <section className="section-form-line">
                    <div className="table-title table-title-form table-title-style">
                      <h5 className="bold-text">Price</h5>
                    </div>
                    <FormAddPrice
                      onChangePrice={this.onChangePrice}
                      index={indexPrice}
                      currencyId={currencyId}
                      amount={amount}
                    />
                  </section>
                </div>
              </section>
            </div>
          </FormAbstract>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            loading={isPosting}
            className="btn btn-primary"
            type="submit"
            title="Add New"
            titleloading="Adding"
            onClick={evt => this.onHandleAddSustomerPricing(evt)}
          />
          <Button color="secondary" onClick={() => this.toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAddCustomerPricing.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  // index: PropTypes.number,
  onSubmitAdd: PropTypes.func,
  isPosting: PropTypes.bool,
};

export default ModalAddCustomerPricing;
