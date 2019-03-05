import _ from 'lodash';
export const required = name => values =>
  values ? undefined : ` Field ${name} can not be blank`;
export const minValue = min => values =>
  values && values < min ? `Must be at least ${min}` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
export const phoneNumber = value =>
  value ? undefined : 'Shouldn’t be empty & must be number';
export const phoneType = values => (values ? undefined : 'Shouldn’t be empty');

const rolesBilling = (name, values) => {
  if (values && !_.isArray(values)) {
    const jsValues = values.toJS();
    if (jsValues.length === 1 && !jsValues[0].billing) {
      return 'Must be check roles BILLING';
    } else if (jsValues.length > 1) {
      let index = 0;
      for (let i = 0; i < jsValues.length; i += 1) {
        if (!jsValues[i].billing) {
          index += 1;
        }
      }
      if (index === jsValues.length) {
        return `Must be at least 1 ${name} has role is BILLING`;
      }
    }
    return undefined;
  }
  return undefined;
};
const rolesRequired = (name, values) => {
  if (values && !_.isArray(values)) {
    const jsValues = values.toJS();
    if (
      _.findIndex(jsValues, 'billing') !== _.findLastIndex(jsValues, 'billing')
    ) {
      return `BILLING already present in another ${name}`;
    }
    if (
      _.findIndex(jsValues, 'sold_to') !== _.findLastIndex(jsValues, 'sold_to')
    ) {
      return `Use As Ship To already present in another ${name}`;
    }
    if (
      _.findIndex(jsValues, 'payment') !== _.findLastIndex(jsValues, 'payment')
    ) {
      return `Use As Payment already present in another ${name}`;
    }
    if (
      _.findIndex(jsValues, 'service') !== _.findLastIndex(jsValues, 'service')
    ) {
      return `Use As Service already present in another ${name}`;
    }
  }
  return undefined;
};

export const roles = name => values => {
  const errorBilling = rolesBilling(name, values);
  const errorRquired = rolesRequired(name, values);
  if (values && !_.isArray(values)) {
    const jsValues = values.toJS();
    for (let i = 0; i < jsValues.length; i += 1) {
      if (
        !jsValues[i].billing &&
        !jsValues[i].sold_to &&
        !jsValues[i].payment &&
        !jsValues[i].service
      ) {
        return 'Role shouldn’t be empty';
      }
    }
  }
  if (errorBilling) {
    if (errorRquired) {
      return `${errorBilling}, ${errorRquired}`;
    }
    return errorBilling;
  }
  return errorRquired;
};
