import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import className from 'classnames';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import { Pagination, Sizing } from 'components/commons';
import { Filter } from 'components/customers';

const headers = [
  'Ac No',
  'First Name',
  'Last Name',
  'State',
  'Organization',
  'Status',
  '',
];

class ModalSelectParentId extends React.Component {
  constructor() {
    super();
    this.state = { isActiveNext: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      const { size } = nextProps;

      if (nextProps.items.length < size) {
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
      onClick={() => this.props.onSelectItem(row)}
      className={className({
        'column-active':
          this.props.idSelected && this.props.idSelected.id === row.id,
      })}
    >
      <td>{row.id}</td>
      <td>{row.fisrtName}</td>
      <td>{row.lastName}</td>
      <td>{row.state}</td>
      <td>{row.organization}</td>
      <td>{row.status}</td>
      <td style={{ width: 55 }}>
        {this.props.idSelected && this.props.idSelected.id === row.id ? (
          <i className="fa fa-check" />
        ) : null}
      </td>
    </tr>
  );

  renderBody(data) {
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={10}>No record has found!</td>
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
      items,
      unSelectItem,
      onHandleSearch,
      isSearching,
      page,
      size,
      handlePage,
      handleSize,
      modalTitle,
    } = this.props;
    const { isActiveNext } = this.state;
    return (
      <Modal
        isOpen={openModal}
        toggle={() => toggleModal()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => toggleModal()}>{modalTitle}</ModalHeader>
        <ModalBody>
          <div className="p-l search-filter-select-item">
            <Filter onHandleSearch={onHandleSearch} isSearching={isSearching} />
          </div>
          <table className="table table-bordered">
            {this.renderHeaderTable()}
            {this.renderBody(_.uniqBy(items, 'id'))}
          </table>
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

ModalSelectParentId.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  items: PropTypes.array,
  idSelected: PropTypes.object,
  onSelectItem: PropTypes.func,
  unSelectItem: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  page: PropTypes.number,
  handlePage: PropTypes.func,
  size: PropTypes.number,
  handleSize: PropTypes.func,
};

export default ModalSelectParentId;
