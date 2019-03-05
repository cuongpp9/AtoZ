import _ from 'lodash';
import invoiceEnum from './invoiceEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));
export default {
  type: tranformObjToArr(invoiceEnum.type),
  status: tranformObjToArr(invoiceEnum.status),
};
