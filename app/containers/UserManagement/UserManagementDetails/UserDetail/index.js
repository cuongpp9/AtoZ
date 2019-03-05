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
import { getUserById } from '../../actions';
import { makeUserDetail } from '../../selectors';
import UserDetailsAddress from './UserDetailsAddress';
import UserDetailsContact from './UserDetailsContact';
import UserDetailsRole from './UserDetailsRole';
import UserDetailRoleGroup from './UserDetailRoleGroup';

class UserDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      activeTab: {},
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getUserById({
      id,
    });
  }

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
    switch (item.state) {
      case 'User → Address':
        return <UserDetailsAddress />;
      case 'User → Contact':
        return <UserDetailsContact />;
      case 'User → Roles':
        return <UserDetailsRole />;
      case 'User→Role Groups':
        return <UserDetailRoleGroup />;
      default:
        return null;
    }
  };

  render() {
    const { activeTab } = this.state;
    const {
      userDetail,
      userDetail: { id = '', category = 'AGENT' } = {},
    } = this.props;
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
        <UserDetailForm data={userDetail} />
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
          />
        </ButtonToolbar>
      </PageAbstract>
    );
  }
}

UserDetail.propTypes = {
  id: PropTypes.string,
  getUserById: PropTypes.func,
  userDetail: PropTypes.object,
};

UserDetail.defaultProps = {
  userDetail: [],
};

const mapStateToProps = createStructuredSelector({
  userDetail: makeUserDetail() || {},
});

export default connect(
  mapStateToProps,
  { getUserById },
)(UserDetail);
