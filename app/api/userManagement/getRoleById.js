import gql from 'graphql-tag';

export default id => {
  const getRoleById = `getRoleById(input: {id: "${id}"})`;
  return gql`
    query {
      ${getRoleById} {
        id
        name
        description
        type
        status
        customerHubModules {
          index
          hubName
          moduleName
          customerModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          orderModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          activityModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          subscriptionModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
        }
        billingHubModules {
          index
          hubName
          moduleName
          billingModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          invoicingModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          ratingModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
        }
        pricingHubModules {
          index
          hubName
          moduleName
          pricingModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          bundleModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
        }
        arHubModules {
          index
          hubName
          moduleName
          arOpsModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          paymentModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          collectionModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
        }
        revenueHubModules {
          index
          hubName
          moduleName
        }
        opsHubModules {
          index
          hubName
          moduleName
          jobsModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
          userModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
        }
        selfCareHubModules {
          index
          hubName
          moduleName
          selfCareModulePermissions {
            index
            moduleName
            permission
            type
            roleLimit
          }
        }
      }
    }
  `;
};
