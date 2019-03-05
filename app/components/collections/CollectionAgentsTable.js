import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SelectField } from 'components/form';
import DynamicSelect from '../commons/DynamicSelect';
import DynamicInput from '../commons/DynamicInput';
import { InputValidate } from '../commons';

const heads = [
  {
    key: 'userId',
    name: 'UserId',
  },
  {
    key: 'firstName',
    name: 'First Name',
  },
  {
    key: 'lastName',
    name: 'Last name',
  },
];
class CollectionAgentsTable extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClickRow = rowData => {
    this.props.onSelectTableRow(rowData);
  };

  onChangeNewValue = (type, val) => {
    this.props.onChangeNewValue(type, val);
  };

  handleClickAddNewRecord = () => {
    const { newAgent = {} } = this.props;
    if (!newAgent.firstName || !newAgent.lastName || !newAgent.userId) {
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

    return (
      <tr
        key={row.index}
        onClick={() => this.handleClickRow(row)}
        className={isSelectedRow ? 'column_active' : null}
      >
        <DynamicSelect
          value={{ value: row.userId, label: row.userId }}
          options={_.uniqBy(this.props.data, 'userId').map(el => ({
            value: el.userId,
            label: el.userId,
          }))}
          placeholder="choose userId"
          name="userId"
          index={id}
          onUpdateValue={this.props.onChangeRowValue}
        />
        <DynamicInput
          type="text"
          name="firstName"
          value={row.firstName}
          index={id}
          onUpdateValue={this.props.onChangeRowValue}
        />
        <DynamicInput
          type="text"
          name="lastName"
          value={row.lastName}
          index={id}
          onUpdateValue={this.props.onChangeRowValue}
        />
      </tr>
    );
  };

  renderNewAgent() {
    const { newAgent = {} } = this.props;
    return (
      <div className="row mt-5 pl-5 pr-5">
        <div className="w-40 px-3">
          <div className="form__form-group-field form">
            <SelectField
              name="type"
              options={[
                { value: 'USER10000000001', label: 'USER10000000001' },
                { value: 'USER10000000002', label: 'USER10000000002' },
                { value: 'UserX001', label: 'UserX001' },
                { value: 'UserX002', label: 'UserX002' },
                { value: 'UserX003', label: 'UserX003' },
              ]}
              placeholder=" User Id"
              className="form__form-group-select"
              valueSelected={
                newAgent &&
                newAgent.userId && {
                  value: newAgent.userId,
                  label: newAgent.userId,
                }
              }
              onChange={val => this.onChangeNewValue('userId', val.value)}
              required
              isClearable
            />
          </div>
        </div>
        <div className="w-30 px-3">
          <div className="form__form-group-field form">
            <InputValidate
              type="text"
              name="firstName"
              placeholder=" First Name"
              value={newAgent && newAgent.firstName}
              onChange={evt =>
                this.onChangeNewValue('firstName', evt.target.value)
              }
              required
            />
          </div>
        </div>
        <div className="w-30 px-3">
          <div className="form__form-group-field form">
            <InputValidate
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={newAgent && newAgent.lastName}
              onChange={evt =>
                this.onChangeNewValue('lastName', evt.target.value)
              }
              required
            />
          </div>
        </div>
      </div>
    );
  }

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
            <td colSpan={3} className="txt-error">
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
            <td colSpan={3}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { rowSelectedItem } = this.props;
    const enableRemove = rowSelectedItem;

    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="select-table-block">
            <CardBody>
              <table
                className="table table-bordered"
                style={{
                  borderTop: '4px solid rgb(55, 188, 155)',
                  tableLayout: 'fixed',
                  width: '100%',
                }}
              >
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
          {this.renderNewAgent()}
          <div className="table__action">
            <Row className="mr-0">
              <div className="ml-auto">
                <Button
                  color="primary"
                  disabled={!enableRemove}
                  onClick={this.handleClickRemoveRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  Remove Agent
                </Button>
              </div>
              <div className="ml-3 ">
                <Button
                  color="primary"
                  onClick={this.handleClickAddNewRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  + Add New Agent
                </Button>
              </div>
            </Row>
            <Row className="mr-0 mt-3">
              <div className="ml-auto ">
                <Button
                  color="primary"
                  onClick={() => {
                    this.props.handleClickApplyButton();
                  }}
                  style={{ padding: '.375rem 1rem' }}
                >
                  Apply
                </Button>
              </div>
            </Row>
          </div>
        </Card>
      </Col>
    );
  }
}

CollectionAgentsTable.propTypes = {
  data: PropTypes.array,
  onChangeRowValue: PropTypes.func,
  handleClickApplyButton: PropTypes.func,
  onSelectTableRow: PropTypes.func,
  handleClickAddNewRecord: PropTypes.func,
  handleClickRemoveRecord: PropTypes.func,
  onChangeNewValue: PropTypes.func,
  rowSelectedItem: PropTypes.object,
  newAgent: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default CollectionAgentsTable;
