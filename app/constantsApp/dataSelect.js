import _ from 'lodash';
import dataEnum from './dataEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));
export default {
  // customer
  accountReason: tranformObjToArr(dataEnum.accountReason),
  accountStatus: tranformObjToArr(dataEnum.accountStatus),
  customerSegment: tranformObjToArr(dataEnum.customerSegment),
  accountType: tranformObjToArr(dataEnum.type),
  accountSubType: tranformObjToArr(dataEnum.subType),
  salesChannel: tranformObjToArr(dataEnum.salesChannel),
  marketSegment: tranformObjToArr(dataEnum.marketSegment),
  accountRoles: tranformObjToArr(dataEnum.roles),
  // salutation: tranformObjToArr(dataEnum.salutation),
  phoneType: tranformObjToArr(dataEnum.phoneType),
  billingFrequency: tranformObjToArr(dataEnum.billingFrequency),
  invoiceType: tranformObjToArr(dataEnum.invoiceType),
  invoiceDelivery: tranformObjToArr(dataEnum.invoiceDelivery),
  paymentTerm: tranformObjToArr(dataEnum.paymentTerm),
  paymentMethod: tranformObjToArr(dataEnum.paymentMethod),
  // pricing management
  revenueType: tranformObjToArr(dataEnum.revenueType),
  boolean: tranformObjToArr(dataEnum.boolean),
  statusPricing: tranformObjToArr(dataEnum.status),
  unit: tranformObjToArr(dataEnum.unit),
  grantUnit: tranformObjToArr(dataEnum.grantUnit),
  pricingModel: tranformObjToArr(dataEnum.pricingModel),
  transactionType: tranformObjToArr(dataEnum.transactionType),
  serviceType: tranformObjToArr(dataEnum.serviceType),
  proration: tranformObjToArr(dataEnum.proration),
  dependencyType: tranformObjToArr(dataEnum.dependencyType),
  billType: tranformObjToArr(dataEnum.billType),
  billStatus: tranformObjToArr(dataEnum.billStatus),
};
