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
      onCancel,
      bSelected,
      onSelectBundle,
      onSubmit,
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
          <div className="txt-error m-l m-t">
            <b>Ensure that the order has one bundle left.</b>
          </div>
          <OrderSelectBundle
            bSelectedId={bSelected}
            onSelectBundle={onSelectBundle}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => onSubmit()}
            disabled={!bSelected.length}
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

ModalChooseBundle.propTypes = {
  openModal: PropTypes.bool,
  bSelected: PropTypes.array,
  onSelectBundle: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ModalChooseBundle;
