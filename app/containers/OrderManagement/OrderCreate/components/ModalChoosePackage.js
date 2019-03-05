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
      onCancel,
      pSelected,
      onSelectPackage,
      onSubmit,
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
          <div className="txt-error m-l m-t">
            <b>Ensure that the order has one Package left.</b>
          </div>
          <OrderSelectPackage
            pSelectedId={pSelected}
            onSelectPackage={onSelectPackage}
          />
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={() => onSubmit()}>
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

ModalChoosePackage.propTypes = {
  openModal: PropTypes.bool,
  pSelected: PropTypes.object,
  onSelectPackage: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalChoosePackage;
