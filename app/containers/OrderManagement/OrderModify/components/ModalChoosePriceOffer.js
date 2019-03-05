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
      toggleModal,
      onCancel,
      poSelected,
      onSelectPriceOffer,
    } = this.props;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => onCancel()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => onCancel()}>Choose Bundle :</ModalHeader>
        <ModalBody>
          <div className="m-l m-t">
            <div className="txt-error">
              <b>Ensure that the order has one price offer left.</b>
            </div>
            Press button <b>OK</b> to continue.
          </div>
          <OrderSelectPriceOffer
            poSelected={poSelected}
            updatePriceOffer={onSelectPriceOffer}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggleModal()}>
            OK
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
  toggleModal: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalChoosePriceOffer;
