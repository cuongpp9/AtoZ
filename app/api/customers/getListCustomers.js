import gql from 'graphql-tag';
import { convertFilterRequestUrl } from 'utils/utils';
import customerVNS from './constants/customerVNS';

export default ({ page, size, filter, sort }) => {
  const sortStr = sort ? `, sort: ${sort}` : '';
  const filterStr = filter
    ? `, filter: ${convertFilterRequestUrl(filter, customerVNS)}`
    : '';
  const searchAccounts = `searchAccounts(page: ${page}, size: ${size}${sortStr}${filterStr})`;
  return gql`
    query {
      ${searchAccounts} {
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
        userId
        parentId
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
          status
          reason
          nextAccountingDate
          nextBillDate
          lastAccountingDate
          lastBillDate
          nextBillUnitId
          lastBillUnitId
          accountId
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
