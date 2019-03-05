import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ButtonToolbar } from 'reactstrap';
import { PageAbstract, ButtonCustom } from 'components/commons';
import {} from 'components/collections';
import { FormCollapse } from 'components/form';
import { btnCollapse } from 'constantsApp';
import { PermissionsTable } from 'components/UserManagement';
import { getRoleById, modifyRole } from '../../actions';

class RoleDetail extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      roleDetail: {},
      activeTab: {},
      activeChildTab: {},
      isLoadding: false,
    };
  }
  componentDidMount() {
    const { id } = this.props;
    this.props.getRoleById(
      {
        id,
      },
      response => {
        if (response.success) {
          this.setState({ roleDetail: response.data });
        }
      },
    );
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
  onToggleChildTab = activeTabName => {
    const { activeChildTab } = this.state;
    if (activeChildTab.name === activeTabName) {
      this.setState({
        activeChildTab: {
          name: activeTabName,
          isActive: !activeChildTab.isActive,
        },
      });
    } else {
      this.setState({
        activeChildTab: { name: activeTabName, isActive: true },
      });
    }
  };

  getPermissionList = (hubName, moduleName) => {
    const { roleDetail } = this.state;
    if (!roleDetail) return [];
    if (
      roleDetail[hubName] &&
      roleDetail[hubName].length > 0 &&
      roleDetail[hubName][0]
    ) {
      return roleDetail[hubName][0][moduleName] || [];
    }
    return [];
  };
  setPermissionList = (hubName, moduleName, permissionTable) => {
    const { roleDetail } = this.state;

    try {
      roleDetail[hubName][0][moduleName] = permissionTable;
      this.setState({
        roleDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handleModifyRoles = () => {
    const { roleDetail } = this.state;

    this.setState({
      isLoadding: true,
    });
    this.props.modifyRole({ rolesInput: roleDetail }, () => {
      this.setState({
        isLoadding: false,
      });
    });
  };
  renderTable = (hubName, moduleName) => (
    <PermissionsTable
      hubName={hubName}
      moduleName={moduleName}
      permissionsList={this.getPermissionList(hubName, moduleName)}
      setPermissionList={this.setPermissionList}
      iHaveSelectAll
    />
  );
  renderItem = item => {
    switch (item.code) {
      case 'CustomerManagementPermissions':
        return this.renderTable(
          'customerHubModules',
          'customerModulePermissions',
        );

      case 'OrderManagementPermissions':
        return this.renderTable('customerHubModules', 'orderModulePermissions');

      case 'ActivityManagementPermissions':
        return this.renderTable(
          'customerHubModules',
          'activityModulePermissions',
        );

      case 'SubscriptionManagementPermissions':
        return this.renderTable(
          'customerHubModules',
          'subscriptionModulePermissions',
        );

      case 'PricingManagementPermissions':
        return this.renderTable(
          'pricingHubModules',
          'pricingModulePermissions',
        );

      case 'BundleManagementPermissions':
        return this.renderTable('pricingHubModules', 'bundleModulePermissions');

      case 'BillingModulePermissions':
        return this.renderTable(
          'billingHubModules',
          'billingModulePermissions',
        );

      case 'InvoicingModulePermissions':
        return this.renderTable(
          'billingHubModules',
          'invoicingModulePermissions',
        );

      case 'RatingModulePermissions':
        return this.renderTable('billingHubModules', 'ratingModulePermissions');

      case 'AROpsPermissions':
        return this.renderTable('arHubModules', 'arOpsModulePermissions');

      case 'PaymentPermissions':
        return this.renderTable('arHubModules', 'paymentModulePermissions');

      case 'CollectionPermissions':
        return this.renderTable('arHubModules', 'collectionModulePermissions');

      case 'UserManagementPermissions':
        return this.renderTable('opsHubModules', 'userModulePermissions');

      case 'JobsManagementPermissions':
        return this.renderTable('arHubModules', 'jobsModulePermissions');

      case 'selfCareModulePermissions':
        return this.renderTable(
          'selfCareHubModules',
          'selfCareModulePermissions',
        );

      default:
        return null;
    }
  };

  render() {
    const { activeTab, activeChildTab, isLoadding } = this.state;
    return (
      <PageAbstract title="">
        {btnCollapse.rolesDetails.map(item => (
          <FormCollapse
            noCardBody
            key={item.title}
            title={item.title}
            isActive={item.code === activeTab.name && activeTab.isActive}
            onToggleTab={this.onToggleTab}
            state={item.code}
          >
            {item.childs.map(child => (
              <FormCollapse
                key={child.title}
                title={child.title}
                isActive={
                  child.code === activeChildTab.name && activeChildTab.isActive
                }
                onToggleTab={this.onToggleChildTab}
                noCardBody
                state={child.code}
              >
                {this.renderItem(child)}
              </FormCollapse>
            ))}
          </FormCollapse>
        ))}
        <ButtonToolbar className="form-create__btn">
          <ButtonCustom
            loading={isLoadding}
            className="ml-auto btn btn-primary m-r px-5"
            title="Modify"
            titleloading="Modifying"
            disabled={isLoadding}
            onClick={() => {
              this.handleModifyRoles();
            }}
          />
        </ButtonToolbar>
      </PageAbstract>
    );
  }
}

RoleDetail.propTypes = {
  id: PropTypes.string,
  getRoleById: PropTypes.func,
  modifyRole: PropTypes.func,
};

export default connect(
  null,
  { getRoleById, modifyRole },
)(RoleDetail);
