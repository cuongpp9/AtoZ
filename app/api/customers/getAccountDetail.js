import gql from 'graphql-tag';

export default id => gql`
  query {
    getAccountById(input: { id: "${id}" }) {
      id
      parentId
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
