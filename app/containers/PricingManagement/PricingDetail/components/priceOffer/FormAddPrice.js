import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { FormGroup, SelectField } from 'components/form';
import { InputValidate, CheckBox } from 'components/commons';
import listCurrency from 'constantsApp/currency.json';

class FormAddPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onChangePrice, indexPrice, currencyId, amount } = this.props;
    return (
      <div className="form-line">
        <div className="form-content">
          <div className="form__half">
            <FormGroup title="Index">
              <InputValidate
                name="index"
                type="number"
                placeholder="Index"
                value={indexPrice}
                onChange={evt => onChangePrice('indexPrice', evt.target.value)}
              />
            </FormGroup>
            <FormGroup title="Ref Index">
              <input
                name="refIndex"
                type="number"
                placeholder="Ref Index"
                onChange={evt => onChangePrice('refIndex', evt.target.value)}
              />
            </FormGroup>
            <FormGroup title="Currency Id">
              <SelectField
                name="currencyId"
                valueSelected={currencyId}
                options={listCurrency.currencies.map(item => ({
                  value: item.code,
                  label: `${item.name} (${item.code})`,
                }))}
                placeholder="Currency Id can not blank!"
                className="form__form-group-select"
                onChange={val => onChangePrice('currencyId', val)}
                required
              />
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Amount">
              <InputValidate
                name="amount"
                type="number"
                placeholder="Amount can not blank!"
                value={amount || ''}
                onChange={evt => onChangePrice('amount', evt.target.value)}
              />
            </FormGroup>
            <FormGroup title=" ">
              <CheckBox
                name="isQuantityScalable"
                label="Is Quantity Scalable"
                onChange={evt =>
                  onChangePrice('isQuantityScalable', evt.target.checked)
                }
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}

FormAddPrice.protoType = {
  onChangePrice: PropTypes.func,
  currencyId: PropTypes.object,
  amount: PropTypes.number,
};

export default FormAddPrice;
