import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { FormGroup, SelectField } from 'components/form';
import { CheckBox } from 'components/commons';
import { orderSelect } from 'constantsApp';
class OrderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      aSelectedId,
      // id,
      type,
      status,
      reason,
      userId,
      effectiveDate,
      submittedDate,
      initialTerm,
      initialTermUnit,
      renewalTerm,
      renewalTermUnit,
      trialTerm,
      trialTermUnit,
      isPartialFulfillmentAllowed,
      onChangeText,
      onChangeSelect,
      onChangeDate,
    } = this.props;
    return (
      <div className="order-create-info">
        <div className="table-title table-title-form ">
          <Row>
            <Col md={12}>
              <h3 className="bold-text">
                Order &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="account-detail">
                  Account Number:
                </span>&nbsp;&nbsp;
                <span className="account-detail">{aSelectedId}</span>
              </h3>
            </Col>
          </Row>
        </div>
        <div className="form-content">
          <div className="form__half">
            {/* <FormGroup title="Id">
              <InputValidate
                name="id"
                type="text"
                placeholder="Id"
                value={id}
                onChange={evt => onChangeText(evt)}
              />
            </FormGroup> */}
            <FormGroup title="Type">
              <input
                name="type"
                // options={orderSelect.type}
                defaultValue={type}
                disabled
              />
            </FormGroup>
            <FormGroup title="Status">
              <SelectField
                name="status"
                options={orderSelect.status}
                valueSelected={status}
                isClearable={false}
                onChange={val => onChangeSelect('status', val)}
              />
            </FormGroup>
            <FormGroup title="Reason">
              <input
                name="reason"
                type="text"
                placeholder="Reason"
                value={reason}
                onChange={onChangeText}
              />
            </FormGroup>
            <FormGroup title="Account Id">
              <input
                name="accountId"
                type="text"
                placeholder="Account Id"
                value={aSelectedId || ''}
                disabled
              />
            </FormGroup>
            <FormGroup title="User Id">
              <input
                name="userId"
                type="text"
                placeholder="User Id"
                value={userId}
                disabled
              />
            </FormGroup>
            <FormGroup title="Effective Date">
              <div className="date-picker">
                <DatePicker
                  name="effectiveDate"
                  placeholderText="YYYY-MM-DD"
                  dateFormat="YYYY-MM-DD"
                  popperPlacement="bottom-start"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  selected={effectiveDate}
                  onChange={date => onChangeDate('effectiveDate', date)}
                  className="form__form-group-datepicker"
                  autoComplete="off"
                  isClearable
                />
              </div>
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
            <FormGroup title="Submitted Date">
              <div className="date-picker">
                <DatePicker
                  name="submittedDate"
                  placeholderText="YYYY-MM-DD"
                  dateFormat="YYYY-MM-DD"
                  popperPlacement="bottom-start"
                  popperModifiers={{
                    flip: {
                      enabled: false,
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                    },
                  }}
                  selected={submittedDate}
                  className="form__form-group-datepicker"
                  autoComplete="off"
                  disabled
                />
              </div>
              <div className="form__form-group-icon">
                <CalendarBlankIcon />
              </div>
            </FormGroup>
          </div>
          <div className="form__half">
            <FormGroup title="Initial Term Unit">
              <SelectField
                name="initialTermUnit"
                options={orderSelect.initialTermUnit}
                placeholder="Initial Term Unit"
                className="form__form-group-select"
                valueSelected={initialTermUnit}
                onChange={val => onChangeSelect('initialTermUnit', val)}
                isClearable={false}
              />
            </FormGroup>
            <FormGroup title="Initial Term">
              <input
                name="initialTerm"
                type="number"
                placeholder="Initial Term"
                value={initialTerm}
                onChange={onChangeText}
              />
            </FormGroup>
            <FormGroup title="Renewal Term Unit">
              <SelectField
                name="renewalTermUnit"
                options={orderSelect.renewalTermUnit}
                placeholder="Renewal Term Unit"
                className="form__form-group-select"
                valueSelected={renewalTermUnit}
                onChange={val => onChangeSelect('renewalTermUnit', val)}
                isClearable={false}
              />
            </FormGroup>
            <FormGroup title="Renewal Term">
              <input
                name="renewalTerm"
                type="number"
                placeholder="Renewal Term"
                value={renewalTerm}
                onChange={onChangeText}
              />
            </FormGroup>
            <FormGroup title="Trial Term Unit">
              <SelectField
                name="trialTermUnit"
                options={orderSelect.trialTermUnit}
                placeholder="Trial Term Unit"
                className="form__form-group-select"
                valueSelected={trialTermUnit}
                onChange={val => onChangeSelect('trialTermUnit', val)}
                isDisabled
              />
            </FormGroup>
            <FormGroup title="Trial Term">
              <input
                name="trialTerm"
                type="number"
                placeholder="Trial Term"
                value={trialTerm}
                onChange={onChangeText}
                disabled
              />
            </FormGroup>
            <FormGroup title=" ">
              <CheckBox
                name="isPartialFulfillmentAllowed"
                checked={isPartialFulfillmentAllowed}
                label="Is Partial Fulfillment Allowed"
                onChange={() =>
                  onChangeSelect(
                    'isPartialFulfillmentAllowed',
                    !isPartialFulfillmentAllowed,
                  )
                }
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
  }
}
OrderInfo.propTypes = {
  aSelectedId: PropTypes.string,
  // id: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.object,
  reason: PropTypes.string,
  userId: PropTypes.string,
  effectiveDate: PropTypes.any,
  submittedDate: PropTypes.any,
  initialTerm: PropTypes.string,
  initialTermUnit: PropTypes.object,
  renewalTerm: PropTypes.string,
  renewalTermUnit: PropTypes.object,
  trialTerm: PropTypes.string,
  trialTermUnit: PropTypes.object,
  isPartialFulfillmentAllowed: PropTypes.bool,
  onChangeText: PropTypes.func,
  onChangeSelect: PropTypes.func,
  onChangeDate: PropTypes.func,
};
export default OrderInfo;
