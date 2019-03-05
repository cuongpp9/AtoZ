import _ from 'lodash';
import orderEnum from './orderEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));
export default {
  type: tranformObjToArr(orderEnum.type),
  status: tranformObjToArr(orderEnum.status),
  initialTermUnit: tranformObjToArr(orderEnum.initialTermUnit),
  renewalTermUnit: tranformObjToArr(orderEnum.renewalTermUnit),
  trialTermUnit: tranformObjToArr(orderEnum.trialTermUnit),
  serviceType: tranformObjToArr(orderEnum.serviceType),
  action: tranformObjToArr(orderEnum.action),
  orderLineStatus: tranformObjToArr(orderEnum.orderLineStatus),
  relativeStartUnit: tranformObjToArr(orderEnum.relativeStartUnit),
  relativeEndUnit: tranformObjToArr(orderEnum.relativeEndUnit),
  subscriptionReason: tranformObjToArr(orderEnum.subscriptionReason),
  subscriptionStatus: tranformObjToArr(orderEnum.subscriptionStatus),
};
