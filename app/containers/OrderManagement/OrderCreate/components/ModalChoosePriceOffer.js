/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
    } = this.props;

    return (
      <Modal
        isOpen={openModal}
        toggle={() => onCancel()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => onCancel()}>
          Select Price Offer :
        </ModalHeader>
        <ModalBody>
          <div className="txt-error m-l m-t">
            <b>Ensure that the order has one Price Offer left.</b>
          </div>
          <OrderSelectPriceOffer
            poSelected={poSelected}
            updatePriceOffer={onSelectPriceOffer}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => onSubmit()}
            disabled={!poSelected.length}
          >
            Select
          </Button>
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
  onSelectPriceOffer: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalChoosePriceOffer;
