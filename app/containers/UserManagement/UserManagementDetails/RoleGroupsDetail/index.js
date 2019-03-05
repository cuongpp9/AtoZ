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
import {
  getRoleGroupById,
  searchRoles,
  setParamsRoles,
  modifyRoleGroup,
} from '../../actions';
import {
  makeGetlistRoles,
  makePageRolesParams,
  errorMessageRoles,
} from '../../selectors';

class RoleGroupsDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      roleGroupDetail: {},
      isActiveNext: true,
      isSearching: false,
      selectedRow: {},
      isOpenSelectRoleModal: false,
    };
  }
  componentDidMount = () => {
    const { id } = this.props;
    this.props.getRoleGroupById({ id }, response => {
      if (response.success && response.data) {
        this.setState({
          roleGroupDetail: response.data,
        });
      }
    });
    // const {
    //   params: { page, size },
    // } = this.props;
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
    const { roleGroupDetail } = this.state;
    roleGroupDetail[fieldName] = value;

    this.setState({
      roleGroupDetail: { ...roleGroupDetail },
    });
  };
  handleRemoveButton = roleId => {
    const { roleGroupDetail } = this.state;
    _.remove(
      roleGroupDetail.roleGroupRoles,
      currentObject => currentObject.roleId === roleId,
    );

    this.setState({
      roleGroupDetail: {
        ...roleGroupDetail,
        roleGroupRoles: [...roleGroupDetail.roleGroupRoles],
      },
    });
  };
  handleSelectButton = () => {
    const { roleGroupDetail, selectedRow } = this.state;
    const checkElementHaveId =
      roleGroupDetail &&
      roleGroupDetail.roleGroupRoles &&
      _.find(
        roleGroupDetail.roleGroupRoles,
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
        index: getNewIndexFromArr(roleGroupDetail.roleGroupRoles),
      };
      this.setState({
        roleGroupDetail: {
          ...roleGroupDetail,
          roleGroupRoles: [...roleGroupDetail.roleGroupRoles, newRow],
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
  handleModifyRoleGroup = () => {
    const { roleGroupDetail } = this.state;
    this.props.modifyRoleGroup(
      { roleGroupInput: roleGroupDetail },
      ({ success, response }) => {
        if (success) {
          this.setState({
            roleGroupDetail: response,
          });
        }
        this.setState({
          isModifyRoleGroup: false,
        });
      },
    );
    this.setState({
      isModifyRoleGroup: true,
    });
  };
  render() {
    const {
      id,
      params: { page, size },
      listRoles,
    } = this.props;
    const {
      roleGroupDetail,
      isOpenSelectRoleModal,
      selectedRow,
      isSearching,
      isActiveNext,
      isModifyRoleGroup,
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
                  <h3 className="bold-text">
                    Role Group &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="account-detail">Role Group Id</span>
                    <span className="account-detail">{id}</span>&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="account-detail">Role Group Name</span>
                    <span className="account-detail">
                      {roleGroupDetail.name}
                    </span>&nbsp;&nbsp;
                  </h3>
                </Col>
              </Row>
            </div>
            <CreateRoleGroupsForm
              data={roleGroupDetail}
              onChangeValueForm={this.onChangeValueForm}
            />
            <RoleGroupsDetailTable
              data={roleGroupDetail.roleGroupRoles}
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
                loading={isModifyRoleGroup}
                className="ml-auto btn btn-primary  mr-5 mb-5 px-5"
                type="submit"
                title="Modify"
                titleloading="modifying"
                onClick={() => {
                  this.handleModifyRoleGroup();
                }}
                disabled={isModifyRoleGroup}
              />
            </ButtonToolbar>
          </div>
        </PageAbstract>
      </div>
    );
  }
}

RoleGroupsDetail.propTypes = {
  params: PropTypes.object,
  listRoles: PropTypes.array,
  id: PropTypes.string,
  getRoleGroupById: PropTypes.func,
  searchRoles: PropTypes.func,
  setParamsRoles: PropTypes.func,
  modifyRoleGroup: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  listRoles: makeGetlistRoles() || [],
  params: makePageRolesParams() || {},
  errorMessage: errorMessageRoles() || '',
});
export default connect(
  mapStateToProps,
  { getRoleGroupById, searchRoles, setParamsRoles, modifyRoleGroup },
)(RoleGroupsDetail);
