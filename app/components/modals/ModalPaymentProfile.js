import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
} from 'reactstrap';

const headers = ['Id', 'Payment Term', 'Payment Method', ''];
class ModalPaymentProfile extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  renderHeaderTable() {
    return (
      <thead>
        <tr>{headers.map(item => <th key={item}>{item}</th>)}</tr>
      </thead>
    );
  }

  renderRow = row => (
    <tr
      key={row.id}
      onClick={() => this.props.onSelectPayment(row.id)}
      className={className({
        'column-active':
          this.props.paymentSelectedId &&
          this.props.paymentSelectedId === row.id,
      })}
    >
      <td>{row.id}</td>
      <td>{row.paymentTerm}</td>
      <td>{row.paymentMethod}</td>
      <td style={{ width: 55 }}>
        {this.props.paymentSelectedId === row.id ? (
          <i className="fa fa-check" />
        ) : null}
      </td>
    </tr>
  );

  renderBody(data) {
    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={4}>No payment profile has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { openModal, toggleModal, modalTitle, paymentProfiles } = this.props;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => toggleModal()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => toggleModal()}>{modalTitle}</ModalHeader>
        <ModalBody>
          <CardBody>
            <table className="table table-bordered">
              {this.renderHeaderTable()}
              {this.renderBody(paymentProfiles)}
            </table>
          </CardBody>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggleModal()}>
            Select
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalPaymentProfile.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  paymentProfiles: PropTypes.array,
  paymentSelectedId: PropTypes.string,
  onSelectPayment: PropTypes.func,
};

export default ModalPaymentProfile;
