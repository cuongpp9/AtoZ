// import React from 'react';
import gql from 'graphql-tag';
import { parseToMutationRequest } from 'utils/utils';
import customerVNS from './constants/customerVNS';

export default data => {
  const dataCreate = parseToMutationRequest(data, customerVNS);
  const modifyAccount = `modifyAccount(input: ${dataCreate})`;
  return gql`
  mutation {
    ${modifyAccount} {
      id
      customerSegment
      type
      subType
      salesChannel
      marketSegment
      sellingCompany
      lineOfBusiness
      legalEntity
      currency
      status
      reason
      effectiveDate
      contacts {
        id
        roles
        salutation
        firstName
        middleName
        lastName
        position
        organization
        email
        createdDate
        phones {
          type
          number
        }
      }
      addresses {
        id
        roles
        street
        extraLine
        landmark
        city
        state
        country
        postalCode
        code
        createdDate
      }
      billingProfiles {
        id
        parentId
        billingDom
        billingSegment
        billingFrequency
        invoiceType
        invoiceDelivery
        paymentProfileId
      }
      paymentProfiles {
        id
        paymentTerm
        paymentMethod
        creditCards {
          cardToken
          cardExpiry
          last4CC
          merchant
        }
      }
    }
  }
`;
};
