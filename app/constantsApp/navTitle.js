import RouteManager from './RouteManager';

export default {
  accounts: {
    label: 'Account',
    route: '/customers',
    itemNav: [
      {
        label: 'Account Info',
        route: '/customers/{}/info',
      },
      {
        label: 'Contact',
        route: '/customers/{}/contacts',
      },
      {
        label: 'Addresses',
        route: '/customers/{}/addresses',
      },
      {
        label: 'Payment Profile',
        route: '/customers/{}/payment-profile',
      },
      {
        label: 'Billing Profile',
        route: '/customers/{}/billing-profile',
      },
      {
        label: 'Services',
        route: '/customers/{}/services',
      },
      {
        label: 'Assets',
        route: '/customers/{}/assets',
      },
      {
        label: 'Balances',
        route: '/customers/{}/balances',
      },
      {
        label: 'Bills',
        route: '/customers/{}/bills',
      },
      {
        label: 'Transactions',
        route: '/customers/{}/transactions',
      },
      {
        label: 'Customer Activity',
        route: '/customers/{}/activities',
      },
      {
        label: 'Hierarchy',
        route: '/customers/{}/hierarchy',
      },
      {
        label: 'Custom Atributes',
        route: '/customers/{}/custom-attributes',
      },
    ],
  },
  priceManagement: {
    label: 'Price Management',
    route: '/pricing-management',
    itemNav: [
      {
        label: 'Item',
        route: '/pricing-management/items',
      },
      {
        label: 'Price Offer',
        route: '/pricing-management/price-offers',
      },
      {
        label: 'Discount Offer',
        route: '/pricing-management/discount-offer',
      },
    ],
  },
  bundleManagement: {
    label: 'Bundle Management',
    route: '/bundle-management',
    itemNav: [
      {
        label: 'Bundle',
        route: '/bundle-management/bundles',
      },
      {
        label: 'Package',
        route: '/bundle-management/packages',
      },
      {
        label: 'Dependency',
        route: '/bundle-management/dependencies',
      },
    ],
  },
  orderManagement: {
    label: 'Order Management',
    route: '/orders/search-list',
    itemNav: [
      {
        label: 'Search & List',
        route: '/orders/search-list',
      },
      {
        label: 'New Order',
        route: '/orders/new',
      },
      {
        label: 'Modify Order',
        route: '/orders/modify',
      },
      {
        label: 'Suspend Order',
        route: '/orders/suspend',
      },
      {
        label: 'Resume Order',
        route: '/orders/resume',
      },
      {
        label: 'Cancel Order',
        route: '/orders/cancel',
      },
      {
        label: 'Renew Order',
        route: '/orders/renew',
      },
      {
        label: 'Upgrade Order',
        route: '/orders/upgrade',
      },
      {
        label: 'Downgrade Order',
        route: '/orders/downgrade',
      },
      {
        label: 'Trial Subsciption',
        route: '/orders/trial-subscription',
      },
      {
        label: 'Opt-In',
        route: '/orders/opt-in',
      },
      {
        label: 'Opt-Out',
        route: '/orders/opt-out',
      },
    ],
    itemDetail: [
      {
        label: 'Info Basic',
        route: '/orders/{}/info',
      },
      {
        label: 'Services',
        route: '/orders/{}/services',
      },
    ],
  },
  arOperations: {
    label: 'AR Operations',
    route: RouteManager.arOperations.mainRoute,
    itemNav: [
      {
        label: 'AR Ops Config',
        route: RouteManager.arOperations.arOpsConfig.route,
      },
      {
        label: 'Adjustments',
        route: RouteManager.arOperations.adjustment.route,
      },
      {
        label: 'Disputes',
        route: RouteManager.arOperations.dispute.route,
      },
      {
        label: 'Write-offs',
        route: RouteManager.arOperations.writeOff.route,
      },
      {
        label: 'Bulk Adjustments',
        route: RouteManager.arOperations.bulkAdjustments.route,
      },
    ],
  },
  collections: {
    label: 'Collections',
    route: '/colecttions',
    itemNav: [
      {
        label: 'Collection Admin',
        route: '/collections/collection-admin',
        childNav: [
          {
            label: 'Collection Config',
            route: '/collections/collection-admin/collection-config',
          },
          {
            label: 'Accounts in Collection',
            route: '/collections/collection-admin/accounts-in-collection',
          },
          {
            label: 'Agent Activity Summary',
            route: '/collections/collection-admin/agent-activity-summary',
          },
        ],
      },
      {
        label: 'Collection Agent',
        route: '/collections/collection-agent',
        childNav: [
          {
            label: 'Search Accounts',
            route: '/collections/collection-agent/search-accounts',
          },
          {
            label: 'Invoice Units',
            route: '/collections/collection-agent/invoice-units',
          },
          {
            label: 'Collection History',
            route: '/collections/collection-agent/collection-history',
          },
        ],
      },
    ],
  },
  payments: {
    label: 'PAYMENTS',
    route: '/payments',
    itemNav: [
      {
        label: 'Payment Admin',
        route: '/payments/payment-admin',
        childNav: [
          {
            label: 'Payment Configuration',
            route: '/payments/payment-admin/payment-configuration',
          },
        ],
      },
      {
        label: 'Payment Agent',
        route: '/payments/payment-agent',
        childNav: [
          {
            label: 'Search Account',
            route: '/payments/payment-agent/search-account',
          },
          {
            label: 'One-Off Payment',
            route: '/payments/payment-agent/one-off-payment',
          },
          {
            label: 'View Payment Activity',
            route: '/payments/payment-agent/view-payment-activity',
          },
          {
            label: 'Payment Allocation',
            route: '/payments/payment-agent/payment-allocation',
          },
          {
            label: 'Payment Suspense',
            route: '/payments/payment-agent/payment-suspense',
          },
          {
            label: 'Customer Refunds',
            route: '/payments/payment-agent/customer-refunds',
          },
          {
            label: 'Manual Chargebacks',
            route: '/payments/payment-agent/manual-chargebacks',
          },
          {
            label: 'Batch Payments',
            route: '/payments/payment-agent/batch-payments',
          },
          {
            label: 'Batch Refunds',
            route: '/payments/payment-agent/batch-refunds',
          },
          {
            label: 'Batch Reversals',
            route: '/payments/payment-agent/batch-reversals',
          },
        ],
      },
    ],
  },
  UserManagement: {
    label: 'User Management',
    route: '/user-management',
    childNav: [
      {
        label: 'Roles',
        route: '/user-management/roles',
      },
      {
        label: 'Role Groups',
        route: '/user-management/role-groups',
      },
      {
        label: 'Users',
        route: '/user-management/users',
      },
    ],
  },
};
