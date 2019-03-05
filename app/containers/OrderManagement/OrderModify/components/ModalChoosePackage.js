/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import OrderSelectPackage from '../../components/OrderSelectPackage';

class ModalChoosePackage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      openModal,
      toggleModal,
      onCancel,
      pSelected,
      onSelectPackage,
    } = this.props;

    return (
      <Modal
        isOpen={openModal}
        toggle={() => onCancel()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => onCancel()}>Choose Package :</ModalHeader>
        <ModalBody>
          <div className="m-l m-t">
            <div className="txt-error">
              <b>Ensure that the order has one package left.</b>
            </div>
            Press button <b>OK</b> to continue.
          </div>
          <OrderSelectPackage
            pSelectedId={pSelected}
            onSelectPackage={onSelectPackage}
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

ModalChoosePackage.propTypes = {
  openModal: PropTypes.bool,
  pSelected: PropTypes.object,
  onSelectPackage: PropTypes.func,
  toggleModal: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalChoosePackage;
