/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { checkEqualArray } from 'utils/utils';
import { ButtonCustom } from 'components/commons';
import OrderSelectPriceOffer from '../../components/OrderSelectPriceOffer';

class ModalChoosePriceOffer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      openModal,
      onCancel,
      poSelected,
      onSelectPriceOffer,
      onSubmit,
      poOrigin,
      isUpdating,
    } = this.props;

    return (
      <Modal
        isOpen={openModal}
        toggle={() => onCancel()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => onCancel()}>
          Select Price Offers :
        </ModalHeader>
        <ModalBody>
          <div className="m-l m-t">
            {
              "When you select other list price offers, it will update order's service."
            }
            <p className="txt-error">
              <b>This action can not undo.</b>
            </p>
            <p className="txt-error">
              <b>Ensure that the order has one price offer left.</b>
            </p>
            Press button <b>Update</b> to continue.
          </div>
          <OrderSelectPriceOffer
            poSelected={poSelected}
            updatePriceOffer={onSelectPriceOffer}
          />
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            type="button"
            loading={isUpdating}
            className="btn btn-primary"
            title="Update"
            titleloading="Updating ..."
            onClick={() => onSubmit()}
            disabled={
              !poSelected.length || checkEqualArray(poSelected, poOrigin)
            }
          />
          <Button color="secondary" onClick={() => onCancel()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalChoosePriceOffer.propTypes = {
  openModal: PropTypes.bool,
  poSelected: PropTypes.array,
  poOrigin: PropTypes.array,
  onSelectPriceOffer: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isUpdating: PropTypes.bool,
};

export default ModalChoosePriceOffer;
