import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonCustom } from 'components/commons';
class ModalNotificationDelete extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      openModal,
      toggleModal,
      modalTitle,
      isPosting,
      onSubmit,
    } = this.props;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => toggleModal()}
        size="lg"
        className="modal-custom modal-custom--delete"
      >
        <ModalHeader toggle={() => toggleModal()}>
          Are you sure you want to delete this {modalTitle}?
        </ModalHeader>
        <ModalBody>
          <div className="content-notification">
            <h1>
              You are about to remove the {modalTitle}. This action cannot be
              undone.
            </h1>
            <p>Press Delete to proceed. Press Cancel to leave this action.</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal()}>
            Cancel
          </Button>{' '}
          <ButtonCustom
            loading={isPosting}
            className="btn btn-danger"
            type="submit"
            title="Delete"
            titleloading="Modifying"
            onClick={evt => {
              onSubmit(evt);
              toggleModal();
            }}
          />
        </ModalFooter>
      </Modal>
    );
  }
}

ModalNotificationDelete.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  onSubmit: PropTypes.func,
  isPosting: PropTypes.bool,
};

export default ModalNotificationDelete;
