import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormAbstract, FormGroup } from 'components/form';
import { ButtonCustom } from 'components/commons';
import ModalActions from '../../modalActions';

class ModalAction extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleAction = evt => {
    evt.preventDefault();

    this.props.handleAction();
  };

  onChangeReason = evt => {
    this.props.onChangeReason(evt.target.value);
  }

  renderReason() {
    return (
      <table cellPadding="4">
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              <b>Reason:&nbsp;</b>
            </td>
            <td>
              <textarea
                className="form-control"
                cols="100" rows="3"
                wrap="virtual"
                onChange={this.onChangeReason}>
              </textarea>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
  render() {
    const { openModal, dismissModal, modalTitle, typeModal, isUpdating } = this.props;
    const submitTitle = () => {
      switch (typeModal) {
        case ModalActions.submit:
          return {
            content: 'SUBMITTED',
            title: 'Submit Order',
            titleloading: 'Submitting...',
          };
        case ModalActions.cancel:
          return {
            content: 'CANCELLED',
            title: 'Cancel Order',
            titleloading: 'Cancelling...',
          };
        case ModalActions.approve:
          return {
            content: 'APPROVED',
            title: 'Approve Order',
            titleloading: 'Approving...',
          };
        default:
          return {
            content: 'SUBMITTED',
            title: 'Submit Order',
            titleloading: 'Submitting...',
          };
      }
    };
    return (
      <Modal isOpen={openModal} toggle={() => dismissModal()} size="lg">
        <ModalHeader toggle={() => dismissModal()}>{modalTitle}</ModalHeader>
        <ModalBody>
          <FormAbstract>
            <div className="form-section">
              <section className="section">
                <div
                  className={classNames('form-content', {
                    'body-modal-submit': typeModal !== ModalActions.cancel,
                    'body-modal-cancel': typeModal === ModalActions.cancel,
                  })}
                >
                  <div>The order's status has been changed to <b>{`${submitTitle().content}`}</b></div>
                  <div>You may enter an optional reason for this action:</div>
                  {this.renderReason()}
                </div>
              </section>
            </div>
          </FormAbstract>
        </ModalBody>
        <ModalFooter>
          <ButtonCustom
            loading={isUpdating}
            className="btn btn-primary"
            type="submit"
            title={submitTitle().title}
            titleloading={submitTitle().titleloading}
            onClick={this.handleAction}
          />
          <Button color="secondary" onClick={() => dismissModal()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalAction.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  dismissModal: PropTypes.func,
  handleAction: PropTypes.func,
  typeModal: PropTypes.string,
  isUpdating: PropTypes.bool,
  onChangeReason: PropTypes.func,
};

export default ModalAction;
