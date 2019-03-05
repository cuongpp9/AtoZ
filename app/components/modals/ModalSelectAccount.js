import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import className from 'classnames';
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
import { Filter } from 'components/customers';
import AccountRow from './AccountRow';

const headers = [
  'Acct No',
  'First Name',
  'Last Name',
  'Organizaition',
  'City',
  'State',
  'Status',
  '',
];
class ModalSelectAccount extends React.Component {
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

  renderRow = row => {
    const { onSelectItem, itemSelected } = this.props;
    return (
      // <tr
      //   key={id}
      //   onClick={() => this.props.onSelectItem(row.id)}
      //   className={className({
      //     'column-active': this.props.itemSelected === row.id,
      //   })}
      // >
      //   <td>{row.id}</td>
      //   <td>{contactBilling.firstName}</td>
      //   <td>{contactBilling.lastName}</td>
      //   <td>{contactBilling.organization}</td>
      //   <td>{addressBilling.city}</td>
      //   <td>{addressBilling.state}</td>
      //   <td>{row.status}</td>
      //   <td style={{ width: 55 }}>
      //     {this.props.itemSelected && this.props.itemSelected === row.id ? (
      //       <i className="fa fa-check" />
      //     ) : null}
      //   </td>
      // </tr>
      <AccountRow
        key={row.id}
        account={row}
        onSelectItem={onSelectItem}
        itemSelected={itemSelected}
      />
    );
  };

  renderBody(data) {
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={8}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const {
      openModal,
      toggleModal,
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
        <ModalHeader toggle={() => toggleModal()}>Choose Account:</ModalHeader>
        <ModalBody>
          <div className="p-l search-filter-select-bundle">
            <Filter onHandleSearch={onHandleSearch} isSearching={isSearching} />
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

ModalSelectAccount.propTypes = {
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
};

export default ModalSelectAccount;
