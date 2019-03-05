/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import OrderSelectBundle from '../../components/OrderSelectBundle';

class ModalChooseBundle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      openModal,
      toggleModal,
      onCancel,
      bSelected,
      onSelectBundle,
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
          <div className=" m-l m-t">
            <div className="txt-error">
              <b>Ensure that the order has one bundle left.</b>
            </div>
            Press button <b>OK</b> to continue.
          </div>
          <OrderSelectBundle
            bSelectedId={bSelected}
            onSelectBundle={onSelectBundle}
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

ModalChooseBundle.propTypes = {
  openModal: PropTypes.bool,
  bSelected: PropTypes.array,
  onSelectBundle: PropTypes.func,
  toggleModal: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalChooseBundle;
