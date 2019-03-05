import _ from 'lodash';
import paymentEnum from './paymentEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));
// const tranformKeyObjToArr = obj =>
//   _.map(obj, (value, key) => ({ value: key, label: value }));
export default {
  accountStatus: tranformObjToArr(paymentEnum.accountStatus),
  status: tranformObjToArr(paymentEnum.status),
  paymentMethod: tranformObjToArr(paymentEnum.paymentMethod),
  paymentReversalReason: tranformObjToArr(paymentEnum.paymentReversalReason),
  paymentTerm: tranformObjToArr(paymentEnum.paymentTerm),
  paymentWorkingDay: tranformObjToArr(paymentEnum.paymentWorkingDay),
  paymentType: tranformObjToArr(paymentEnum.paymentType),
};
