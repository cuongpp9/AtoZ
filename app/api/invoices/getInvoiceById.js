import gql from 'graphql-tag';

export default id => gql`
  query {
    getInvoiceUnitById(input: { id: "${id}" }) {
      id
      type
      accountId
      billUnitId
      originalId
      parentId
      invoiceType
      invoiceDelivery
      company
      invoiceDate
      dueDate
      status
      total
      due
      taxId
      message
      customerAddress {
        type
        street
        extraLine
        landmark
        city
        state
        country
        postalCode
      }
      returnAddress {
        type
        street
        extraLine
        landmark
        city
        state
        country
        postalCode
      }
      invoiceSummaryList {
        index
        name
        quantity
        unitPrice
        amount
      }
      invoiceSummaryTotal {
        taxSubTotal
        summarySubTotal
        total
        sofaTotal
      }
      invoiceSofaList {
        index
        invoiceNumber
        total
        due
        invoiceDate
      }
      invoiceTaxList {
        index
        city
        state
        jurisdiction
        taxableAmount
        taxRate
        exemptAmount
        amount
      }
    }
  }
`;
