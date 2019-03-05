export default {
  arOperations: {
    name: 'ar-operations',
    mainRoute: '/ar-operations',
    adjustment: {
      name: 'adjustments',
      route: '/ar-operations/adjustments',
      process: '/ar-operations/adjustments/apply',
      detail: '/ar-operations/adjustments/{}/detail',
    },
    dispute: {
      name: 'disputes',
      route: '/ar-operations/disputes',
      process: '/ar-operations/disputes/apply',
      detail: '/ar-operations/disputes/{}/detail',
    },
    settlement: {
      name: 'settlements',
      process: '/ar-operations/settlements/apply',
    },
    writeOff: {
      name: 'write-offs',
      route: '/ar-operations/write-offs',
      process: '/ar-operations/write-offs/apply',
      detail: '/ar-operations/write-offs/{}/detail',
    },
    reverseWriteOffs: {
      name: 'reverse-write-offs',
      process: '/ar-operations/reverse-write-offs/apply',
    },
    arOpsConfig: {
      name: 'ar-ops-config',
      route: '/ar-operations/ar-ops-config',
    },
    bulkAdjustments: {
      name: 'bulk-adjustments',
      route: '/ar-operations/bulk-adjustments',
    },
  },
  pricingManagement: {
    name: 'pricing-management',
    mainRoute: '/pricing-management',
    item: {
      name: 'items',
      route: '/pricing-management/items',
      detail: '/pricing-management/items/{}/detail',
      create: '/pricing-management/items/create',
    },
    priceOffer: {
      name: 'price-offers',
      route: '/pricing-management/price-offers',
      detail: '/pricing-management/price-offers/{}/detail',
      create: '/pricing-management/price-offers/create',
    },
    discountOffer: {
      name: 'discount-offer',
      route: '/pricing-management/discount-offer',
      detail: '/pricing-management/discount-offer/{}/detail',
      create: '/pricing-management/discount-offer/create',
    },
  },
  bundleManagement: {
    name: 'bundle-management',
    mainRoute: '/bundle-management',
    bundle: {
      name: 'bundles',
      route: '/bundle-management/bundles',
      detail: '/bundle-management/bundles/{}/detail',
      create: '/bundle-management/bundles/create',
    },
    dependency: {
      name: 'dependencies',
      route: '/bundle-management/dependencies',
      detail: '/bundle-management/dependencies/{}/detail',
      create: '/bundle-management/dependencies/create',
    },
    package: {
      name: 'packages',
      route: '/bundle-management/packages',
      detail: '/bundle-management/packages/{}/detail',
      create: '/bundle-management/packages/create',
    },
  },
  userManagement: {
    name: 'user-management',
    mainRoute: '/user-management',
    roles: {
      name: 'roles',
      route: '/user-management/roles',
    },
  },
};
