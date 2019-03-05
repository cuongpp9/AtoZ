import _ from 'lodash';
import userManagementEnum from './userManagementEnum';

const tranformObjToArr = obj => _.map(obj, n => ({ value: n, label: n }));

export default {
  permissionStatus: tranformObjToArr(userManagementEnum.permissionStatus),
  accountStatus: tranformObjToArr(userManagementEnum.accountStatus),
  userCategory: tranformObjToArr(userManagementEnum.userCategory),
};
