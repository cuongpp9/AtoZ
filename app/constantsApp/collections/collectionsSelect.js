import _ from 'lodash';
import collectionsEnum from './collectionsEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));
export default {
  type: tranformObjToArr(collectionsEnum.type),
  action: tranformObjToArr(collectionsEnum.action),
  status: tranformObjToArr(collectionsEnum.status),
  accountStatus: tranformObjToArr(collectionsEnum.accountStatus),
};
