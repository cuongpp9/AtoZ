/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonCustom } from 'components/commons';
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
      isUpdating,
      originP,
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
            {"When you change the package, it will update order's service."}
            <p className="txt-error">
              <b>This action can not undo.</b>
            </p>
            Press button <b>Update</b> to continue.
          </div>
          <OrderSelectPackage
            pSelectedId={pSelected}
            onSelectPackage={onSelectPackage}
          />
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            loading={isUpdating}
            className="btn btn-primary"
            type="button"
            title="Update"
            titleloading="Updating ..."
            onClick={() => onSubmit()}
            disabled={pSelected.id === originP.id}
          />
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
  isUpdating: PropTypes.bool,
  originP: PropTypes.object,
};

export default ModalChoosePackage;
