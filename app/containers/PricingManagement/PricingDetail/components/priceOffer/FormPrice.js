import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Select from 'react-select';
import { InputValidate, CheckBox } from 'components/commons';
import { FormGroup } from 'components/form';
import listCurrency from 'constantsApp/currency.json';

export const FormPrice = ({ data, parentId, parentName, onChangePrices }) => {
  return _.map(data, (item, key) => (
    <div key={key} className="form-content">
      <div className="form__block">
        <div className="form__half">
          <FormGroup title="Index">
            <InputValidate
              name="index"
              type="number"
              placeholder="Index"
              value={item.index}
              onChange={evt =>
                onChangePrices(
                  parentName,
                  parentId,
                  key,
                  'index',
                  evt.target.value,
                )
              }
              disabled
            />
          </FormGroup>
          <FormGroup title="Ref Index">
            <input
              name="refIndex"
              type="number"
              placeholder="Ref Index"
              value={item.refIndex}
              onChange={evt =>
                onChangePrices(
                  parentName,
                  parentId,
                  key,
                  'refIndex',
                  evt.target.value,
                )
              }
              disabled
            />
          </FormGroup>
          <FormGroup title="Currency">
            <Select
              name="currencyId"
              options={listCurrency.currencies.map(item => ({
                value: item.code,
                label: `${item.name} (${item.code})`,
              }))}
              placeholder="Currency"
              value={item.currencyId}
              className="form__form-group-select"
              onChange={val =>
                onChangePrices(parentName, parentId, key, 'currencyId', val)
              }
              isDisabled
            />
          </FormGroup>
        </div>
        <div className="form__half">
          <FormGroup title="Amount">
            <InputValidate
              name="amount"
              type="number"
              value={item.amount}
              placeholder="Field can not empty"
              onChange={evt =>
                onChangePrices(
                  parentName,
                  parentId,
                  key,
                  'amount',
                  evt.target.value,
                )
              }
            />
          </FormGroup>
          <FormGroup title=" ">
            <CheckBox
              name="isQuantityScalable"
              label="Is Quantity Scalable"
              checked={item.isQuantityScalable}
              onChange={() =>
                onChangePrices(
                  parentName,
                  parentId,
                  key,
                  'isQuantityScalable',
                  !item.isQuantityScalable,
                )
              }
              disabled
            />
          </FormGroup>
        </div>
      </div>
    </div>
  ));
};
FormPrice.propTypes = {
  data: PropTypes.object,
  parentId: PropTypes.string,
  parentName: PropTypes.string,
  onChangePrices: PropTypes.func,
};
