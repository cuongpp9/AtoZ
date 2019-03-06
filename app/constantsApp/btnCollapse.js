export default {
  createAccount: [
    {
      id: 1,
      title: 'Create Account Info',
      state: 'accountInfo',
    },
    {
      id: 2,
      title: 'Create Contact',
      state: 'contact',
    },
    {
      id: 3,
      title: 'Create Address',
      state: 'address',
    },
    {
      id: 4,
      title: 'Create Payment Profile',
      state: 'paymentProfile',
    },
    {
      id: 5,
      title: 'Create Billing Profile',
      state: 'billingProfile',
    },
  ],
  collections: [
    {
      id: 1,
      title: 'Collection Actions',
      state: 'actions',
    },
    {
      id: 2,
      title: 'Collection Schedule',
      state: 'schedule',
    },
    {
      id: 3,
      title: 'Collection Agents',
      state: 'agents',
    },
  ],
  paymentConfiguration: [
    {
      id: 1,
      title: 'Merchant Account',
      state: 'account',
    },
    {
      id: 2,
      title: 'Payment Types',
      state: 'Types',
    },
    {
      id: 3,
      title: 'Payment Terms',
      state: 'terms',
    },
  ],
  rolesDetails: [
    {
      id: 1,
      title: 'Self-Care Hub Modules',
      code: 'selfCareHubModules',
      childs: [
        {
          id: 1,
          title: 'Self-Care Permissions',
          code: 'selfCareModulePermissions',
        },
      ],
    },
    {
      id: 2,
      title: 'Customer Hub Modules',
      code: 'CustomerHubModules',
      childs: [
        {
          id: 1,
          title: 'Customer Management Permissions',
          code: 'CustomerManagementPermissions',
        },
        {
          id: 2,
          title: 'Order Management Permissions',
          code: 'OrderManagementPermissions',
        },
        {
          id: 3,
          title: 'Activity Management Permissions',
          code: 'ActivityManagementPermissions',
        },
        {
          id: 4,
          title: 'Subscription Management Permissions',
          code: 'SubscriptionManagementPermissions',
        },
      ],
    },
    {
      id: 3,
      title: 'Pricing Hub Modules',
      code: 'PricingHubModules',
      childs: [
        {
          id: 1,
          title: 'Pricing Management Permissions',
          code: 'PricingManagementPermissions',
        },
        {
          id: 2,
          title: 'Bundle Management Permissions',
          code: 'BundleManagementPermissions',
        },
      ],
    },
    {
      id: 4,
      title: 'Billing Hub Modules',
      code: 'BillingHubModules',
      childs: [
        {
          id: 1,
          title: 'Billing Module Permissions',
          code: 'BillingModulePermissions',
        },
        {
          id: 2,
          title: 'Invoicing Module Permissions',
          code: 'InvoicingModulePermissions',
        },
        {
          id: 3,
          title: 'Rating Module Permissions',
          code: 'RatingModulePermissions',
        },
      ],
    },

    {
      id: 5,
      title: 'AR Hub Modules',
      code: 'ARHubModules',
      childs: [
        {
          id: 1,
          title: 'AR Ops Permissions',
          code: 'AROpsPermissions',
        },
        {
          id: 2,
          title: 'Payment Permissions',
          code: 'PaymentPermissions',
        },
        {
          id: 3,
          title: 'Collection Permissions',
          code: 'CollectionPermissions',
        },
      ],
    },
    {
      id: 6,
      title: 'Ops Hub Modules',
      code: 'OpsHubModules',
      childs: [
        {
          id: 1,
          title: 'User Management Permissions',
          code: 'UserManagementPermissions',
        },
        {
          id: 2,
          title: 'Jobs Management Permissions',
          code: 'JobsManagementPermissions',
        },
      ],
    },
    {
      id: 7,
      title: 'Revenue Hub Modules',
      code: 'RevenueHubModules',
      childs: [],
    },
  ],
  user: [
    {
      id: 1,
      title: 'User → Address',
      state: 'User → Address',
    },
    {
      id: 2,
      title: 'User → Contact',
      state: 'User → Contact',
    },
    {
      id: 3,
      title: 'User → Roles',
      state: 'User → Roles',
    },
    {
      id: 4,
      title: 'User → Role Groups',
      state: 'User → Role Groups',
    },
  ],
};
