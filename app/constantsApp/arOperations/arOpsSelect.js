import _ from 'lodash';
import arOpsEnum from './arOpsEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));
export default {
  type: tranformObjToArr(arOpsEnum.type),
  arType: tranformObjToArr(arOpsEnum.arType),
  reason: tranformObjToArr(arOpsEnum.reason),
  source: tranformObjToArr(arOpsEnum.source),
  taxRule: tranformObjToArr(arOpsEnum.taxRule),
  disputeStatus: tranformObjToArr(arOpsEnum.disputeStatus),
  writeOffStatus: tranformObjToArr(arOpsEnum.writeOffStatus),
  revenueRecognitionType: tranformObjToArr(arOpsEnum.revenueRecognitionType),
};
