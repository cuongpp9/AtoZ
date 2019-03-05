import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import className from 'classnames';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  CardBody,
} from 'reactstrap';
import { Pagination, Sizing } from 'components/commons';
import { SearchFilterInvoiceUnits } from 'components/invoices';
const headers = [
  'Id',
  'Type',
  'Status',
  'Invoice Type',
  'Invoice Date',
  'Due Date',
  'Due',
  '',
];
class ModalSelectInvoiceUnit extends React.Component {
  constructor() {
    super();
    this.state = { isActiveNext: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      const { size } = nextProps;

      if (nextProps.items && nextProps.items.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }

  renderHeaderTable() {
    return (
      <thead>
        <tr>{headers.map(item => <th key={item}>{item}</th>)}</tr>
      </thead>
    );
  }

  renderRow = (row, id) => (
    <tr
      key={id}
      onClick={() => this.props.onSelectItem(row.id)}
      className={className({
        'column-active': this.props.itemSelected === row.id,
      })}
    >
      <td>{row.id}</td>
      <td>{row.type}</td>
      <td>{row.status}</td>
      <td>{row.invoiceType}</td>
      <td>{row.invoiceDate}</td>
      <td>{row.dueDate}</td>
      <td>{row.due}</td>
      <td style={{ width: 55 }}>
        {this.props.itemSelected && this.props.itemSelected === row.id ? (
          <i className="fa fa-check" />
        ) : null}
      </td>
    </tr>
  );

  renderBody(data) {
    const { accountId } = this.props;
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={8}>{`No Invoice has found for account ${accountId}`}</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { openModal, toggleModal, accountId } = this.props;
    if (!accountId) {
      return (
        <Modal
          isOpen={openModal}
          toggle={() => toggleModal()}
          size="lg"
          className="modal-custom"
        >
          <ModalHeader toggle={() => toggleModal()}>
            Choose Invoice:
          </ModalHeader>
          <ModalBody>
            <div className="modal-notice-validate">
              <div className="font-bold txt-error">
                Please input account Id first!
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => toggleModal()}>
              OK
            </Button>{' '}
          </ModalFooter>
        </Modal>
      );
    }

    const {
      unSelectItem,
      onHandleSearch,
      items,
      isSearching,
      size,
      page,
      handlePage,
      handleSize,
    } = this.props;
    const { isActiveNext } = this.state;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => toggleModal()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => toggleModal()}>Choose Invoice:</ModalHeader>
        <ModalBody>
          <div className="p-l search-filter-select-bundle">
            <SearchFilterInvoiceUnits
              onHandleSearch={onHandleSearch}
              isSearching={isSearching}
            />
          </div>
          <CardBody>
            <table className="table table-bordered">
              {this.renderHeaderTable()}
              {this.renderBody(_.uniqBy(items, 'id'))}
            </table>
          </CardBody>
          <div className="table__action p-l p-r">
            <Row>
              <Col md={6}>
                <Pagination
                  page={5}
                  isActivePre={page !== 1}
                  isActiveNext={isActiveNext}
                  handlePage={handlePage}
                />
              </Col>
              <Col md={6}>
                <Sizing handleSize={handleSize} size={size} />
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => toggleModal()}>
            Select
          </Button>{' '}
          <Button color="danger" onClick={() => unSelectItem()}>
            Unselect
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalSelectInvoiceUnit.propTypes = {
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  items: PropTypes.array,
  itemSelected: PropTypes.string,
  onSelectItem: PropTypes.func,
  unSelectItem: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  page: PropTypes.number,
  handlePage: PropTypes.func,
  size: PropTypes.number,
  handleSize: PropTypes.func,
  accountId: PropTypes.string,
};

export default ModalSelectInvoiceUnit;
