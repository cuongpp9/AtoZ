import _ from 'lodash';
import moment from 'moment';
import locations from 'constantsApp/locationsUS.json';

/**
 * convertFilterRequestUrl
 * @param {*} obj : filter object input
 * @param {*} arrNS : list field name will parse not string
 */
export const convertFilterRequestUrl = (obj, arrNS = []) => {
  const arr = _.map(obj, (value, key) => {
    if (value === null) return null;
    if (arrNS.includes(key)) {
      return `${key}: ${value}`;
    }
    return `${key}: "${value}"`;
  });
  return `{${arr.filter(el => !!el).join(', ')}}`;
};

export const convertArrEnumtoString = (value, key) => {
  const arr = _.map(value, itemValue => `${itemValue}`);
  return `${key}:[${arr.filter(el => !!el).join(', ')}]`;
};

export const formatStringUrl = (...args) => {
  let i = 1;
  const str = args[0];

  return str.replace(/\{\}/g, () => args[i++]); // eslint-disable-line
};

const filter = _.partial(_.filter, locations);

export function getCities(state) {
  const resultFilter = filter({ state_abbr: state.toUpperCase() });
  return _.uniqBy(resultFilter, 'city');
}

export function getZips(city, state) {
  return filter({ city, state_abbr: state.toUpperCase() });
}

export const calculateValCallback = ({ success, data }) => {
  if (success) {
    return data;
  }

  return [];
};

export const checkChangeSelectValue = (val1, val2) => {
  if (!val1 && !val2) return false;

  if (val1 && !val2) return true;

  if (!val1 && val2) return true;

  return val1 !== val2.value;
};

export const checkChangeValue = (val1, val2) => {
  if (!val1 && !val2) return false; // val1 and val2 is null, '', false

  return val1 !== val2;
};

export const checkChangeDate = (valDate, strDate) => {
  if (!valDate && !strDate) return false;

  return (
    moment(valDate).format('YYYY-MM-DD') !==
    moment(strDate).format('YYYY-MM-DD')
  );
};

export const checkChangeSelectField = (val1, val2) =>
  checkChangeValue(val1 ? val1.value : null, val2 ? val2.value : null);

export const handleError = (err, msgCandidate) => {
  if (typeof err === 'string') return err;

  return msgCandidate;
};

export const checkEqualArray = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  const newArr1 = _.orderBy(arr1, ['id'], ['asc']);
  const newArr2 = _.orderBy(arr2, ['id'], ['asc']);

  return newArr1.every((el, index) => el.id === newArr2[index].id);
};

export const checkExistElInArr = (el, nameEl, arr, nameCheck) => {
  const index = arr.findIndex(item => el[nameEl] === item[nameCheck]);
  if (index === -1) return false;
  return true;
};

export function strTwoFractionDigits(number) {
  if (!number) return '0.00';
  return Intl.NumberFormat('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

export function roundFloat(value, decimals) {
  if (!value) return '0.00';
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals); //eslint-disable-line
}

const parseObjToString = (value, key, arrNS) => {
  if (arrNS.includes(key)) {
    return `${key}: ${value}`;
  }
  if (value === null) {
    if (key === 'grants' || key === 'phones') {
      return '';
    }
    return null;
  }
  return `${key}: "${value}"`;
};

const parseArrToString = (value, key, arrNS) => {
  const arr = _.map(value, itemValue => {
    const arrItem = _.map(itemValue, (childValue, childKey) => {
      if (childKey === 'roles') {
        return convertArrEnumtoString(childValue, childKey);
      }
      if (_.isArray(childValue)) {
        return parseArrToString(childValue, childKey, arrNS);
      }
      return parseObjToString(childValue, childKey, arrNS);
    });
    return `{${arrItem.filter(el => !!el).join(', ')}}`;
  });
  return `${key}: [${arr.filter(el => !!el).join(', ')}]`;
};

/**
 * parseToMutationRequest: used for create or modify
 * @param {*} obj : object input
 * @param {*} arrNS : list field name will parse not string
 */
export const parseToMutationRequest = (obj, arrNS = []) => {
  const arr = _.map(obj, (value, key) => {
    if (value === null) return null;
    if (_.isArray(value)) {
      return parseArrToString(value, key, arrNS);
    }
    return parseObjToString(value, key, arrNS);
  });
  return `{${arr.filter(el => !!el).join(', ')}}`;
};

/**
 * parseToMutationRequest: used for create or modify
 * @param {*} obj : object input
 * @param {*} arrNS : list field name will parse not string
 */
export const parseToUserManagementMutationRequest = (
  obj,
  objectNS = [],
  arrayNS = [],
) => {
  const arr = _.map(obj, (value, key) => {
    if (value === null) return null;
    if (_.isArray(value)) {
      return parseArrToString(value, key, arrayNS);
    }
    return parseObjToString(value, key, objectNS);
  });
  return `{${arr.filter(el => !!el).join(', ')}}`;
};

export const getNewIndexFromArr = (arr = []) => {
  const last = _.last(arr);
  if (last) {
    return last.index + 1;
  }

  return 1;
};
