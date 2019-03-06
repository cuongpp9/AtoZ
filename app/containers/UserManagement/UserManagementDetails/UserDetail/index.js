import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ButtonToolbar, Row, Col } from 'reactstrap';
import { PageAbstract, ButtonCustom } from 'components/commons';
import {} from 'components/collections';
import { FormCollapse } from 'components/form';
import { UserDetailForm } from 'components/UserManagement';
import { createStructuredSelector } from 'reselect';
import { btnCollapse } from 'constantsApp';
import { getUserById, modifyUser } from '../../actions';
import { makeUserDetail } from '../../selectors';
import UserDetailsAddress from './UserDetailsAddress';
import UserDetailsContact from './UserDetailsContact';
import UserDetailsRole from './UserDetailsRole';
import UserDetailRoleGroup from './UserDetailRoleGroup';

class UserDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      userDetail: {},
      activeTab: {},
      isLoadding: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getUserById(
      {
        id,
      },
      (response, success) => {
        if (success) {
          this.setState({ userDetail: response });
        }
      },
    );
  }

  onChangeValueForm = (fieldName, value) => {
    const { userDetail } = this.state;
    userDetail[fieldName] = value;
    this.setState({
      userDetail: { ...userDetail },
    });
  };

  handleModifyUser = () => {
    const { userDetail } = this.state;

    this.setState({
      isLoadding: true,
    });
    this.props.modifyUser({ modifyUserInput: userDetail }, () => {
      this.setState({
        isLoadding: false,
      });
    });
  };

  onToggleTab = activeTabName => {
    const { activeTab } = this.state;
    if (activeTab.name === activeTabName) {
      this.setState({
        activeTab: { name: activeTabName, isActive: !activeTab.isActive },
      });
    } else {
      this.setState({ activeTab: { name: activeTabName, isActive: true } });
    }
  };

  renderItem = item => {
    // console.log('userDetail', this.state.userDetail);
    const {
      userDetail,
      userDetail: { roles = [], roleGroups },
    } = this.state;
    switch (item.state) {
      case 'User → Address':
        return (
          <UserDetailsAddress
            data={userDetail}
            onChangeValueForm={this.onChangeValueForm}
          />
        );
      case 'User → Contact':
        return (
          <UserDetailsContact
            data={userDetail}
            onChangeValueForm={this.onChangeValueForm}
          />
        );
      case 'User → Roles':
        return <UserDetailsRole roles={roles} />;
      case 'User → Role Groups':
        return <UserDetailRoleGroup roleGroups={roleGroups} />;
      default:
        return null;
    }
  };

  render() {
    const { activeTab } = this.state;
    const {
      userDetail,
      userDetail: { id, category },
    } = this.state;
    return (
      <PageAbstract title="">
        <div className="form-content">
          <div className="form-header">
            <Row>
              <Col md={12}>
                <span className="bold-text">
                  Users &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">User Id</span>&nbsp;&nbsp;
                  <span className="account-detail">{id}</span>&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">Category</span>&nbsp;&nbsp;
                  <span className="account-detail">{category}</span>&nbsp;&nbsp;
                </span>
              </Col>
            </Row>
          </div>
        </div>
        <UserDetailForm
          data={userDetail}
          onChangeValueForm={this.onChangeValueForm}
        />
        {btnCollapse.user.map(item => (
          <FormCollapse
            noCardBody
            key={item.title}
            title={item.title}
            isActive={item.state === activeTab.name && activeTab.isActive}
            onToggleTab={this.onToggleTab}
            state={item.state}
          >
            {this.renderItem(item)}
          </FormCollapse>
        ))}
        <ButtonToolbar className="form-create__btn">
          <ButtonCustom
            loading={false}
            className="ml-auto btn btn-primary m-r px-5"
            type="submit"
            title="Modify"
            titleloading="Modifying"
            disabled={false}
            onClick={() => {
              this.handleModifyUser();
            }}
          />
        </ButtonToolbar>
      </PageAbstract>
    );
  }
}

UserDetail.propTypes = {
  id: PropTypes.string,
  getUserById: PropTypes.func,
  modifyUser: PropTypes.func,
};

// UserDetail.defaultProps = {
//   userDetail: [],
// };

const mapStateToProps = createStructuredSelector({
  userDetail: makeUserDetail() || {},
});

export default connect(
  mapStateToProps,
  { getUserById, modifyUser },
)(UserDetail);
