import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';

const ModalValidate = ({ visible, handleDismissModal, msg }) => (
  <Modal
    isOpen={visible}
    toggle={() => handleDismissModal()}
    size="lg"
    className="modal-custom modal-custom--delete"
  >
    <ModalHeader toggle={() => handleDismissModal()}>
      <b>Validate Data Error</b>
    </ModalHeader>
    <ModalBody>
      <div className="modal-notice-validate">
        <div
          dangerouslySetInnerHTML={{ __html: msg }}
          className="font-bold txt-error"
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => handleDismissModal()}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

ModalValidate.propTypes = {
  visible: PropTypes.bool,
  handleDismissModal: PropTypes.func,
  msg: PropTypes.string,
};

export default ModalValidate;
