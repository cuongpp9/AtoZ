import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import { RolesSearchFilter, RolesTable } from '../UserManagement';

class ModalSelectParentItem extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  renderBody(data) {
    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={6}>No record has found!</td>
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
      listRoles,
      selectedRow,
      isActiveNext,
      onHandleSearch,
      isSearching,
      page,
      size,
      handlePage,
      handleSize,
      modalTitle,
      handleUnSelectButton,
      handleSort,
      handleClickRow,
      handleSelectButton,
    } = this.props;

    return (
      <Modal
        isOpen={openModal}
        toggle={() => toggleModal()}
        size="lg"
        className="modal-custom"
      >
        <ModalHeader toggle={() => toggleModal()}>{modalTitle}</ModalHeader>
        <ModalBody>
          <Row className="px-4 mt-3 ">
            <Col md={12}>
              <h3 className="bold-text">Roles</h3>
              <RolesSearchFilter
                onHandleSearch={onHandleSearch}
                isSearching={isSearching}
              />
            </Col>
          </Row>
          <Row className="mx-0 px-0">
            <RolesTable
              data={listRoles}
              handleSort={handleSort}
              page={page}
              size={size}
              handlePage={handlePage}
              isActiveNext={isActiveNext}
              handleSize={handleSize}
              selectedRow={selectedRow}
              handleClickRow={handleClickRow}
            />
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleSelectButton()}>
            Select
          </Button>{' '}
          <Button color="danger" onClick={() => handleUnSelectButton()}>
            Unselect
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ModalSelectParentItem.propTypes = {
  modalTitle: PropTypes.string,
  openModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  listRoles: PropTypes.array,
  onHandleSearch: PropTypes.func,
  selectedRow: PropTypes.func,
  handleUnSelectButton: PropTypes.func,
  handleSelectButton: PropTypes.func,
  handleSort: PropTypes.func,
  isSearching: PropTypes.bool,
  page: PropTypes.number,
  handlePage: PropTypes.func,
  size: PropTypes.number,
  handleSize: PropTypes.func,
  handleClickRow: PropTypes.func,
  isActiveNext: PropTypes.bool,
};

export default ModalSelectParentItem;
