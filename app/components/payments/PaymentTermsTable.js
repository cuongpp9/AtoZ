import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { DynamicSelectField, DynamicInputField } from 'components/form';
import { paymentSelect, paymentTerm } from 'constantsApp';
import DynamicSelect from '../commons/DynamicSelect';
import DynamicInput from '../commons/DynamicInput';

const heads = [
  {
    key: 'paymentTerm',
    name: 'Payment Term',
  },
  {
    key: 'description',
    name: 'Description',
  },
  {
    key: 'invoiceDateOffset',
    name: 'Invoice Date Offset',
  },
  {
    key: 'workingDay',
    name: 'Working Day',
  },
  {
    key: 'Days',
    name: 'Days',
  },
];
class PaymentTypesTable extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onChangeNewValue = (type, val) => {
    this.props.onChangeNewValue(type, val);
  };

  handleClickRow = rowData => {
    this.props.onSelectTableRow(rowData);
  };

  handleClickAddNewRecord = () => {
    const { newItem = {} } = this.props;
    if (!newItem.paymentWorkingDay || !newItem.paymentTerm || !newItem.offset) {
      return;
    }
    this.props.handleClickAddNewRecord();
  };

  handleClickRemoveRecord = () => {
    this.props.handleClickRemoveRecord();
  };

  renderRow = (row, id) => {
    const isSelectedRow =
      this.props.rowSelectedItem && this.props.rowSelectedItem === row;
    const newPaymentTerm = paymentTerm.find(e => e.method === row.paymentTerm);

    return (
      <tr
        key={id}
        onClick={() => this.handleClickRow(row)}
        className={isSelectedRow ? 'column_active' : null}
      >
        <DynamicSelect
          value={{ value: row.paymentTerm, label: row.paymentTerm }}
          options={paymentSelect.paymentTerm}
          name="paymentTerm"
          index={id}
          onUpdateValue={this.props.updateActionRowValue}
        />
        <td>{newPaymentTerm.description} </td>
        <DynamicInput
          type="number"
          value={row.offset}
          name="offset"
          index={id}
          onUpdateValue={this.props.updateActionRowValue}
        />
        <DynamicSelect
          value={{ value: row.paymentWorkingDay, label: row.paymentWorkingDay }}
          options={paymentSelect.paymentWorkingDay}
          name="paymentWorkingDay"
          index={id}
          onUpdateValue={this.props.updateActionRowValue}
        />
        <DynamicInput
          type="number"
          value={row.days}
          name="days"
          index={id}
          onUpdateValue={this.props.updateActionRowValue}
        />
      </tr>
    );
  };

  renderHeader = header => (
    <th key={header.key} scope="col" className="p-2">
      {header.name}
    </th>
  );

  renderBody() {
    const { data, errorMessage } = this.props;
    if (errorMessage) {
      return (
        <tbody>
          <tr>
            <td colSpan={5} className="txt-error">
              {errorMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={5}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  renderNewItem = () => {
    const { newItem = {} } = this.props;

    return (
      <div className="row mt-3 ml-5 mr-5">
        <div className="form__form-group-field form w-20 px-3 ml-5">
          <label>
            <b>Payment Term</b>
          </label>
          <DynamicSelectField
            name="paymentTerm"
            options={paymentSelect.paymentTerm}
            className="form__form-group-select"
            valueSelected={
              newItem.paymentTerm
                ? { value: newItem.paymentTerm, label: newItem.paymentTerm }
                : null
            }
            onChange={val => this.onChangeNewValue('paymentTerm', val.value)}
            required
            isClearable
          />
        </div>
        <div className="form__form-group-field form w-20 px-3 ml-5">
          <label>
            <b>Invoice Date Offset</b>
          </label>
          <DynamicInputField
            type="number"
            name="offset"
            value={newItem.offset}
            onChange={evt => this.onChangeNewValue('offset', evt.target.value)}
            placeholder="Invoice Date Offset"
            required
          />
        </div>
        <div className="form__form-group-field form w-20 px-3 ml-5">
          <label>
            <b>Working Day</b>
          </label>
          <DynamicSelectField
            name="paymentWorkingDay"
            options={paymentSelect.paymentWorkingDay}
            className="form__form-group-select"
            valueSelected={
              newItem.paymentWorkingDay
                ? {
                  value: newItem.paymentWorkingDay,
                  label: newItem.paymentWorkingDay,
                }
                : null
            }
            onChange={val =>
              this.onChangeNewValue('paymentWorkingDay', val.value)
            }
            required
            isClearable
          />
        </div>
        <div className="form__form-group-field form w-20 px-3 ml-5">
          <label>
            <b>Days</b>
          </label>
          <DynamicInputField
            type="number"
            name="days"
            value={newItem.days}
            onChange={evt => this.onChangeNewValue('days', evt.target.value)}
            placeholder="days"
            required
          />
        </div>
      </div>
    );
  };

  render() {
    const { rowSelectedItem } = this.props;
    const enableRemove = rowSelectedItem;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="select-table-block ml-5 mr-5">
            <CardBody>
              <table
                className="table table-bordered"
                style={{
                  borderTop: '4px solid rgb(55, 188, 155)',
                  tableLayout: 'fixed',
                }}
              >
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
          {this.renderNewItem()}
          <div className="table__action">
            <Row className="mr-5 mt-3">
              <div className="ml-auto">
                <Button
                  color="primary"
                  disabled={!enableRemove}
                  onClick={this.handleClickRemoveRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  Delete Payment Term
                </Button>
              </div>
              <div className="ml-3">
                <Button
                  color="primary"
                  onClick={this.handleClickAddNewRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  + Add Payment Term
                </Button>
              </div>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }
}

PaymentTypesTable.propTypes = {
  data: PropTypes.array,
  updateActionRowValue: PropTypes.func,
  onSelectTableRow: PropTypes.func,
  handleClickAddNewRecord: PropTypes.func,
  handleClickRemoveRecord: PropTypes.func,
  rowSelectedItem: PropTypes.object,
  errorMessage: PropTypes.string,
  onChangeNewValue: PropTypes.func,
  newItem: PropTypes.object,
};

export default PaymentTypesTable;
