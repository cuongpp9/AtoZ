import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { collectionsSelect } from 'constantsApp';
import { SelectField } from '../form';
import DynamicSelect from '../commons/DynamicSelect';
import DynamicInput from '../commons/DynamicInput';
import { InputValidate } from '../commons';

const heads = [
  {
    key: 'offsetdays',
    name: 'Offset Days',
  },
  {
    key: 'action',
    name: 'Action',
  },
  {
    key: 'description',
    name: 'Description',
  },
];
class CollectionScheduleTable extends Component {
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
    const { newSchedule = {} } = this.props;
    if (
      !newSchedule.offsetdays ||
      !newSchedule.action ||
      !newSchedule.description
    ) {
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
        <DynamicInput
          type="number"
          name="offsetdays"
          value={row.offsetdays}
          index={id}
          onUpdateValue={this.props.onChangeRowValue}
        />
        <DynamicSelect
          value={{ value: row.action, label: row.action }}
          options={collectionsSelect.action}
          placeholder="Action"
          name="action"
          index={id}
          onUpdateValue={this.props.onChangeRowValue}
        />
        <DynamicInput
          type="text"
          name="description"
          value={row.description}
          index={id}
          onUpdateValue={this.props.onChangeRowValue}
        />
      </tr>
    );
  };

  renderNewSchedule = newSchedule => (
    <div className="row mt-5">
      <div className="w-30 px-3">
        <div className="form__form-group-field form">
          <label>
            <b>Offset Days</b>
          </label>
          <InputValidate
            type="number"
            name="firstName"
            placeholder="Offset Days"
            value={newSchedule.offsetdays}
            onChange={evt =>
              this.onChangeNewValue('offsetdays', evt.target.value)
            }
            required
          />
        </div>
      </div>
      <div className="w-30 px-3">
        <div className="form__form-group-field form">
          <label>
            <b>Action</b>
          </label>
          <SelectField
            name="select"
            options={collectionsSelect.action}
            placeholder="Action"
            className="form__form-group-select"
            valueSelected={
              newSchedule.action && {
                value: newSchedule.action,
                label: newSchedule.action,
              }
            }
            onChange={val => this.onChangeNewValue('action', val.value)}
            required
            isClearable
          />
        </div>
      </div>
      <div className="w-40 px-3">
        <div className="form__form-group-field form">
          <label>
            <b>Description</b>
          </label>
          <InputValidate
            type="text"
            name="description"
            placeholder="Description"
            value={newSchedule.description}
            onChange={evt =>
              this.onChangeNewValue('description', evt.target.value)
            }
            required
          />
        </div>
      </div>
    </div>
  );

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
            <td colSpan={11} className="txt-error">
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
            <td colSpan={11}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { rowSelectedItem, newSchedule = {} } = this.props;
    const enableRemove = rowSelectedItem;
    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="select-table-block">
            <CardBody>
              <table
                className="table table-bordered"
                style={{ borderTop: '4px solid rgb(55, 188, 155)' }}
              >
                <thead>
                  <tr>{heads.map(item => this.renderHeader(item))}</tr>
                </thead>
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
          {this.renderNewSchedule(newSchedule)}
          <div className="table__action">
            <Row className="mr-0">
              <div className="ml-auto">
                <Button
                  color="primary"
                  disabled={!enableRemove}
                  onClick={this.handleClickRemoveRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  Delete schedule item
                </Button>
              </div>
              <div className="ml-3 ">
                <Button
                  color="primary"
                  onClick={this.handleClickAddNewRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  + Add New Schedule item
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

CollectionScheduleTable.propTypes = {
  data: PropTypes.array,
  onChangeRowValue: PropTypes.func,
  onSelectTableRow: PropTypes.func,
  handleClickAddNewRecord: PropTypes.func,
  handleClickRemoveRecord: PropTypes.func,
  handleClickApplyButton: PropTypes.func,
  onChangeNewValue: PropTypes.func,
  rowSelectedItem: PropTypes.object,
  newSchedule: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default CollectionScheduleTable;
