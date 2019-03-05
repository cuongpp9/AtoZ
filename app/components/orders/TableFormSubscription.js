import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';
// import Select from 'react-select';
import { FormGroup, SelectField } from 'components/form';
import { InputValidate } from 'components/commons';
import { orderSelect } from 'constantsApp';
const headers = [
  {
    name: 'Effective Date',
  },
  { name: 'Status' },
  { name: 'Reason' },
  { name: 'Subscription Reason', hide: true },
  { name: 'Initial Term Unit' },
  { name: 'Initial Term' },
  { name: 'Renewal Term Unit' },
  { name: 'Renewal Term' },
  { name: 'Trial Term Unit' },
  { name: 'Trial Term' },
];

class TableFormSubsciption extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderHeaderTable() {
    const { isResume, isRenew } = this.props;
    return (
      <thead>
        <tr>
          {headers.map(item => (
            <th
              key={item.name}
              className={`${
                (isResume || isRenew) && item.hide ? 'field-none' : ''
              }`}
            >
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  renderRow = row => {
    const {
      onChangeSelect,
      onChangeText,
      subscriptionReason,
      // subscriptionStatus,
      renewalTermUnit,
      renewalTerm,
      isSuspend,
      // isResume,
      isCancel,
      isRenew,
    } = this.props;
    return (
      <tr>
        <td>
          <FormGroup title="">
            <input
              name="effectiveDate"
              type="text"
              value={row.effectiveDate}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            {/* {isResume ? (
              <Select
                name="subscriptionStatus"
                options={orderSelect.subscriptionStatus}
                value={
                  subscriptionStatus || { value: row.status, label: row.status }
                }
                className="form__form-group-select"
                onChange={val => onChangeSelect('subscriptionStatus', val)}
              />
            ) : ( */}
            <input
              name="status"
              type="text"
              value={row.status}
              onChange={() => {}}
              disabled
            />
            {/* )} */}
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="reason"
              type="text"
              value={row.reason}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        {isSuspend || isCancel ? (
          <td>
            <FormGroup title="">
              <SelectField
                name="subscriptionReason"
                options={orderSelect.subscriptionReason}
                placeholder="Can`t empty!"
                className="form__form-group-select"
                valueSelected={subscriptionReason}
                onChange={val => onChangeSelect('subscriptionReason', val)}
                required
              />
            </FormGroup>
          </td>
        ) : null}
        <td>
          <FormGroup title="">
            <input
              name="initialTermUnit"
              type="text"
              value={row.initialTermUnit}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="initialTerm"
              type="number"
              value={row.initialTerm}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            {isRenew ? (
              <SelectField
                name="renewalTermUnit"
                options={orderSelect.renewalTermUnit}
                placeholder="Can`t empty!"
                valueSelected={renewalTermUnit}
                className="form__form-group-select"
                onChange={val => onChangeSelect('renewalTermUnit', val)}
                required
              />
            ) : (
              <input
                name="renewalTermUnit"
                type="text"
                value={row.renewalTermUnit}
                onChange={() => {}}
                disabled
              />
            )}
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            {isRenew ? (
              <InputValidate
                name="renewalTerm"
                type="number"
                value={renewalTerm}
                placeholder={`${
                  renewalTerm || renewalTerm === 0 ? '' : 'Can`t empty!'
                }`}
                onChange={onChangeText}
              />
            ) : (
              <input
                name="renewalTerm"
                type="number"
                value={row.renewalTerm}
                onChange={() => {}}
                disabled
              />
            )}
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="trialTermUnit"
              type="text"
              value={row.trialTermUnit}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="trialTerm"
              type="number"
              value={row.trialTerm}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
      </tr>
    );
  };

  renderBody = () => {
    const { data, errorSubscription } = this.props;
    if (errorSubscription) {
      return (
        <tbody>
          <tr>
            <td colSpan={10} className="txt-error">
              {errorSubscription}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data) {
      return (
        <tbody>
          <tr>
            <td colSpan={10}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{this.renderRow(data)}</tbody>;
  };

  render() {
    return (
      <div className="table-form table-form-service">
        <CardBody>
          <table className="table table-bordered">
            {this.renderHeaderTable()}
            {this.renderBody()}
          </table>
        </CardBody>
      </div>
    );
  }
}

TableFormSubsciption.propTypes = {
  data: PropTypes.object,
  errorSubscription: PropTypes.string,
  onChangeSelect: PropTypes.func,
  onChangeText: PropTypes.func,
  subscriptionReason: PropTypes.object,
  subscriptionStatus: PropTypes.object,
  renewalTermUnit: PropTypes.object,
  renewalTerm: PropTypes.any,
  isSuspend: PropTypes.bool,
  isResume: PropTypes.bool,
  isCancel: PropTypes.bool,
  isRenew: PropTypes.bool,
};

export default TableFormSubsciption;
