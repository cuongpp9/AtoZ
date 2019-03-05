import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SelectField } from 'components/form';
import { paymentMethod } from 'constantsApp';

const heads = [
  {
    key: 'method',
    name: 'Method',
  },
  {
    key: 'description',
    name: 'Description',
  },
];
class PaymentTermsTable extends Component {
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
    if (!newItem) {
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
    const paymentMethodTmp = paymentMethod.find(e => e.method === row.method);
    return (
      <tr
        key={id}
        onClick={() => this.handleClickRow(row)}
        className={isSelectedRow ? 'column_active' : ''}
      >
        <td>{row.method}</td>
        <td>{paymentMethodTmp.description}</td>
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
            <td colSpan={2} className="txt-error">
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
            <td colSpan={2}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  renderNewItem = () => {
    const { newItem = {}, options } = this.props;

    return (
      <div className="row  ml-5 mt-3">
        <div className="align-items-center row ml-5">
          <b>Method</b>
        </div>
        <div className="form__form-group-field row form w-40 ml-5 px-3 ">
          <SelectField
            name="type"
            options={options}
            className="form__form-group-select"
            valueSelected={newItem}
            onChange={val => this.onChangeNewValue('method', val)}
            required
            isClearable
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
            <Row className="mr-5">
              <div className="ml-auto">
                <Button
                  color="primary"
                  disabled={!enableRemove}
                  onClick={this.handleClickRemoveRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  Delete Payment Method
                </Button>
              </div>
              <div className="ml-5">
                <Button
                  color="primary"
                  onClick={this.handleClickAddNewRecord}
                  style={{ padding: '.375rem .75rem' }}
                  disabled={!this.props.newItem || !this.props.newItem.value}
                >
                  + Add Payment Method
                </Button>
              </div>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }
}

PaymentTermsTable.propTypes = {
  data: PropTypes.array,
  onSelectTableRow: PropTypes.func,
  handleClickAddNewRecord: PropTypes.func,
  handleClickRemoveRecord: PropTypes.func,
  rowSelectedItem: PropTypes.object,
  errorMessage: PropTypes.string,
  onChangeNewValue: PropTypes.func,
  newItem: PropTypes.object,
  options: PropTypes.array,
};

export default PaymentTermsTable;
