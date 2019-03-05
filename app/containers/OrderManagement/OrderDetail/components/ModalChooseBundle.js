/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { checkEqualArray } from 'utils/utils';
import { ButtonCustom } from 'components/commons';
import OrderSelectBundle from '../../components/OrderSelectBundle';

class ModalChooseBundle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      openModal,
      onCancel,
      bSelected,
      onSelectBundle,
      onSubmit,
      bOrigin,
      isUpdating,
    } = this.props;

    return (
      <Modal
        isOpen={openModal}
        toggle={() => onCancel()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => onCancel()}>Select Bundles :</ModalHeader>
        <ModalBody>
          <div className="m-l m-t">
            {
              "When you select other list bundles, it will update order's service."
            }
            <p className="txt-error">
              <b>This action can not undo.</b>
            </p>
            <p className="txt-error">
              <b>Ensure that the order has one bundle left.</b>
            </p>
            Press button <b>Update</b> to continue.
          </div>
          <OrderSelectBundle
            bSelectedId={bSelected}
            onSelectBundle={onSelectBundle}
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
            disabled={!bSelected.length || checkEqualArray(bSelected, bOrigin)}
          />
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
  bOrigin: PropTypes.array,
  onSelectBundle: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isUpdating: PropTypes.bool,
};

export default ModalChooseBundle;
