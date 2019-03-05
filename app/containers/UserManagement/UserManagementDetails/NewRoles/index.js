import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar } from 'reactstrap';
import { PageAbstract, ButtonCustom } from 'components/commons';
import {} from 'components/collections';
import { FormCollapse } from 'components/form';
import { CreateRoleForm, PermissionsTable } from 'components/UserManagement';
import { btnCollapse } from 'constantsApp';

const mockData = [
  {
    index: 0,
    permission: 'CREATE_CUSTOMER',
    type: 'READ_ONLY',
    roleLimit: null,
  },
  {
    index: 1,
    permission: 'CREATE_CUSTOMER',
    type: 'READ_ONLY',
    roleLimit: null,
  },
  {
    index: 2,
    permission: 'CREATE_CUSTOMER',
    type: 'READ_ONLY',
    roleLimit: null,
  },
];
class NewRoles extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      activeTab: {},
      activeChildTab: {},
    };
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
  getPermissionList = (hubName, moduleName) =>
    // const { roleDetail } = this.state;
    // if (!roleDetail) return [];
    // if (
    //   roleDetail[hubName] &&
    //   roleDetail[hubName].length > 0 &&
    //   roleDetail[hubName][0]
    // ) {
    //   return roleDetail[hubName][0][moduleName] || [];
    // }
    mockData;
  setPermissionList = (hubName, moduleName, permissionTable) => {};
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
    const { activeTab, activeChildTab } = this.state;

    return (
      <PageAbstract title="">
        <CreateRoleForm />
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
            loading={false}
            className="ml-auto btn btn-primary m-r px-5"
            type="submit"
            title="Create"
            titleloading="Creating"
            disabled={false}
          />
        </ButtonToolbar>
      </PageAbstract>
    );
  }
}

NewRoles.propTypes = {};

export default connect(
  null,
  {},
)(NewRoles);
