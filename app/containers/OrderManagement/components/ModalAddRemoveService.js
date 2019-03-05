/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import OrderSelectPackage from './OrderSelectPackage';
import OrderSelectBundle from './OrderSelectBundle';
import OrderSelectPriceOffer from './OrderSelectPriceOffer';
import ModalMode from '../ModalAddRemoveMode';

const arrTitleModal = {
  package: 'Choose Package:',
  bundle: 'Add or Remove Bundles:',
  alacarte: 'Add or Remove Price Offers:',
};

class ModalAddRemoveService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalTitle: this.getModalTitle(props.mode),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode !== nextProps.mode) {
      this.setState({ modalTitle: this.getModalTitle(nextProps.mode) });
    }
  }

  getModalTitle = mode => {
    switch (mode) {
      case ModalMode.purchasePackage:
        return arrTitleModal.package;
      case ModalMode.purchaseBundle:
        return arrTitleModal.bundle;
      case ModalMode.purchaseAlaCarte:
        return arrTitleModal.alacarte;
      default:
        return arrTitleModal.package;
    }
  };

  render() {
    const {
      openModal,
      toggleModal,
      mode,
      pSelected,
      bSelected,
      poSelected,
      onSelectPackage,
      onSelectBundle,
      onSelectPriceOffer,
      onSubmit,
    } = this.props;
    const { modalTitle } = this.state;

    const component = () => {
      if (mode === ModalMode.purchasePackage) {
        return (
          <OrderSelectPackage
            pSelectedId={pSelected}
            onSelectPackage={onSelectPackage}
          />
        );
      } else if (mode === ModalMode.purchaseBundle) {
        return (
          <OrderSelectBundle
            bSelectedId={bSelected}
            onSelectBundle={onSelectBundle}
          />
        );
      }
      return (
        <OrderSelectPriceOffer
          poSelected={poSelected}
          updatePriceOffer={onSelectPriceOffer}
        />
      );
    };

    return (
      <Modal
        isOpen={openModal}
        toggle={() => toggleModal()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => toggleModal()}>{modalTitle}</ModalHeader>
        <ModalBody>{component()}</ModalBody>
        <ModalFooter>
          <Button type="button" color="primary" onClick={() => onSubmit()}>
            OK
          </Button>
          <Button color="secondary" onClick={() => toggleModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAddRemoveService.propTypes = {
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  mode: PropTypes.string,
  pSelected: PropTypes.object,
  bSelected: PropTypes.array,
  poSelected: PropTypes.array,
  onSelectPackage: PropTypes.func,
  onSelectBundle: PropTypes.func,
  onSelectPriceOffer: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default ModalAddRemoveService;
