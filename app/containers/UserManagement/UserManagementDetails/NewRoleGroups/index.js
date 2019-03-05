import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Row, Col } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import { PageAbstract, ButtonCustom } from 'components/commons';
import {} from 'components/collections';
import { rolesSort } from 'constantsApp';
import { getNewIndexFromArr } from 'utils/utils';
import PropTypes from 'prop-types';
import {
  CreateRoleGroupsForm,
  RoleGroupsDetailTable,
  SelectRoleModal,
} from 'components/UserManagement';
import { searchRoles, setParamsRoles, createRoleGroup } from '../../actions';
import {
  makeGetlistRoles,
  makePageRolesParams,
  errorMessageRoles,
} from '../../selectors';

class NewRoleGroup extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      newRoleGroup: this.getDefaultValue(),
      isActiveNext: true,
      isSearching: false,
      selectedRow: {},
      isOpenSelectRoleModal: false,
    };
  }
  componentDidMount = () => {
    this.props.setParamsRoles({ page: 1, size: 10 });
    this.props.searchRoles({
      page: 1,
      size: 10,
      sort: this.sort,
      filter: this.filter,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.listRoles !== nextProps.listRoles) {
      const {
        params: { size },
      } = nextProps;

      if (nextProps.listRoles.length < size) {
        this.setState({ isActiveNext: false });
      } else {
        this.setState({ isActiveNext: true });
      }
    }
  }
  getDefaultValue = () => ({
    name: '',
    description: '',
    type: '',
    status: '',
    roleGroupRoles: [],
  });
  onHandleSearch = filter => {
    this.setState({ isSearching: true });

    this.props.searchRoles(
      {
        page: 1,
        size: 10,
        filter,
        sort: this.sort,
      },
      () => {
        this.setState({ isSearching: false, selectedRow: null });
        this.props.setParamsRoles({ page: 1, size: 10 });
      },
    );
    this.filter = filter;
  };

  handlePage = pageOffset => {
    const {
      params: { page, size },
    } = this.props;

    this.props.setParamsRoles({ size, page: page + pageOffset });
    this.props.searchRoles(
      {
        page: page + pageOffset,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ selectedRow: null });
      },
    );
  };

  handleSize = size => {
    this.props.setParamsRoles({ size, page: 1 });
    this.props.searchRoles(
      {
        page: 1,
        size,
        filter: this.filter,
        sort: this.sort,
      },
      () => {
        this.setState({ selectedRow: null });
      },
    );
  };

  handleSort = (key, value) => {
    this.props.searchRoles(
      {
        page: 1,
        size: 10,
        filter: this.filter,
        sort: rolesSort[key][value],
      },
      () => {
        this.props.setParamsRoles({ page: 1, size: 10 });
        this.setState({ selectedRow: null });
      },
    );
    this.sort = rolesSort[key][value];
  };
  handleClickRow = row => {
    this.setState({
      selectedRow: row,
    });
  };
  onChangeValueForm = (fieldName, value) => {
    const { newRoleGroup } = this.state;
    newRoleGroup[fieldName] = value;

    this.setState({
      newRoleGroup: { ...newRoleGroup },
    });
  };
  handleRemoveButton = roleId => {
    const { newRoleGroup } = this.state;
    _.remove(
      newRoleGroup.roleGroupRoles,
      currentObject => currentObject.roleId === roleId,
    );

    this.setState({
      newRoleGroup: {
        ...newRoleGroup,
        roleGroupRoles: [...newRoleGroup.roleGroupRoles],
      },
    });
  };
  handleSelectButton = () => {
    const { newRoleGroup, selectedRow } = this.state;
    const checkElementHaveId =
      newRoleGroup &&
      newRoleGroup.roleGroupRoles &&
      _.find(
        newRoleGroup.roleGroupRoles,
        item => item.roleId === selectedRow.id,
      );
    if (checkElementHaveId) {
      alert('This role already existed previously in the role table');
      this.setState({
        isOpenSelectRoleModal: false,
      });
    } else {
      const newRow = {
        roleId: selectedRow.id,
        index: getNewIndexFromArr(newRoleGroup.roleGroupRoles),
      };
      this.setState({
        newRoleGroup: {
          ...newRoleGroup,
          roleGroupRoles: [...newRoleGroup.roleGroupRoles, newRow],
        },
        isOpenSelectRoleModal: false,
      });
    }
  };
  handleUnSelectButton = () => {
    this.setState({
      isOpenSelectRoleModal: false,
    });
  };
  toggleModal = () => {
    this.setState({
      isOpenSelectRoleModal: !this.state.isOpenSelectRoleModal,
    });
  };
  handleCreateRoleGroup = () => {
    const { newRoleGroup } = this.state;
    if (!newRoleGroup.name) {
      alert('Role Group Name cannot be empty');
      return;
    }
    if (!newRoleGroup.status) {
      alert('Role Group Status cannot be empty');
      return;
    }
    if (!newRoleGroup.type) {
      alert('Role Group Type cannot be empty');
      return;
    }
    if (!newRoleGroup.description) {
      alert('Role Group Description cannot be empty');
      return;
    }

    this.props.createRoleGroup(
      { roleGroupInput: newRoleGroup },
      ({ success }) => {
        if (success) {
          this.setState({
            newRoleGroup: this.getDefaultValue(),
          });
        }
        this.setState({
          isCreatingRoleGroup: false,
        });
      },
    );
    this.setState({
      isCreatingRoleGroup: true,
    });
  };
  render() {
    const {
      params: { page, size },
      listRoles,
    } = this.props;
    const {
      newRoleGroup,
      isOpenSelectRoleModal,
      selectedRow,
      isSearching,
      isActiveNext,
      isCreatingRoleGroup,
    } = this.state;
    return (
      <div className="user-management">
        <SelectRoleModal
          modalTitle="Select Role"
          openModal={isOpenSelectRoleModal}
          toggleModal={this.toggleModal}
          listRoles={listRoles}
          onHandleSearch={this.onHandleSearch}
          selectedRow={selectedRow}
          handleUnSelectButton={this.handleUnSelectButton}
          handleSelectButton={this.handleSelectButton}
          handleSort={this.handleSort}
          isSearching={isSearching}
          handleSize={this.handleSize}
          page={page}
          size={size}
          handlePage={this.handlePage}
          handleClickRow={this.handleClickRow}
          isActiveNext={isActiveNext}
        />
        <PageAbstract title="">
          <div className="form-content">
            <div className="form-header">
              <Row>
                <Col md={12}>
                  <h3 className="bold-text">Role Group</h3>
                </Col>
              </Row>
            </div>
            <CreateRoleGroupsForm
              data={newRoleGroup}
              onChangeValueForm={this.onChangeValueForm}
            />
            <RoleGroupsDetailTable
              data={newRoleGroup.roleGroupRoles}
              handleRemoveButton={this.handleRemoveButton}
              errorMessage=""
            />
            <ButtonToolbar className="form-create__btn">
              <div className="ml-5 center-box border-gray px-5">
                Role Group Name
              </div>
              <ButtonCustom
                loading={false}
                className=" btn btn-primary ml-5 px-5 mb-2"
                type="submit"
                title="Add New Role To Role Group"
                titleloading=" Add New Role To Role Group"
                onClick={() => {
                  this.setState({
                    isOpenSelectRoleModal: true,
                  });
                }}
              />
            </ButtonToolbar>
            <ButtonToolbar className="form-create__btn">
              <ButtonCustom
                loading={isCreatingRoleGroup}
                className="ml-auto btn btn-primary  mr-5 mb-5 px-5"
                type="submit"
                title="Create"
                titleloading="Creating"
                onClick={() => {
                  this.handleCreateRoleGroup();
                }}
                disabled={isCreatingRoleGroup}
              />
            </ButtonToolbar>
          </div>
        </PageAbstract>
      </div>
    );
  }
}

NewRoleGroup.propTypes = {
  params: PropTypes.object,
  listRoles: PropTypes.array,

  searchRoles: PropTypes.func,
  setParamsRoles: PropTypes.func,
  createRoleGroup: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  listRoles: makeGetlistRoles() || [],
  params: makePageRolesParams() || {},
  errorMessage: errorMessageRoles() || '',
});
export default connect(
  mapStateToProps,
  { searchRoles, setParamsRoles, createRoleGroup },
)(NewRoleGroup);
