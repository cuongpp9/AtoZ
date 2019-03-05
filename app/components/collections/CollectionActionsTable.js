import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { collectionsSelect } from 'constantsApp';
import DynamicSelect from '../commons/DynamicSelect';
import DynamicInput from '../commons/DynamicInput';
import { SelectField } from '../form';
import { InputValidate } from '../commons';

const heads = [
  {
    key: 'action',
    name: 'Action',
  },
  {
    key: 'description',
    name: 'Description',
  },
];
class CollectionActionsTable extends Component {
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
    const { newAction = {} } = this.props;
    if (!newAction.action || !newAction.description) {
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
          value={{ value: row.action, label: row.action }}
          options={collectionsSelect.action}
          name="action"
          index={id}
          onUpdateValue={this.props.updateActionRowValue}
        />
        <DynamicInput
          value={row.description}
          name="description"
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

  renderNewAction = () => {
    const { newAction = {} } = this.props;

    return (
      <div className="row mt-5">
        <div className="form__form-group-field form w-40 px-3 ml-5">
          <label>
            <b>Action</b>
          </label>
          <SelectField
            name="reason"
            options={collectionsSelect.action}
            className="form__form-group-select"
            valueSelected={
              newAction.action
                ? {
                  value: newAction.action,
                  label: newAction.action,
                }
                : null
            }
            onChange={val => this.onChangeNewValue('action', val.value)}
            required
            isClearable
          />
        </div>
        <div className="form__form-group-field form w-40 px-3 ml-5">
          <label>
            <b>Description</b>
          </label>
          <InputValidate
            type="text"
            name="description"
            value={newAction.description}
            onChange={evt =>
              this.onChangeNewValue('description', evt.target.value)
            }
            placeholder="Input text"
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
          <div className="select-table-block">
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
          {this.renderNewAction()}
          <div className="table__action">
            <Row className="mr-0">
              <div className="ml-auto">
                <Button
                  color="primary"
                  disabled={!enableRemove}
                  onClick={this.handleClickRemoveRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  Delete Action
                </Button>
              </div>
              <div className="ml-3 ">
                <Button
                  color="primary"
                  onClick={this.handleClickAddNewRecord}
                  style={{ padding: '.375rem .75rem' }}
                >
                  + Add New Action
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

CollectionActionsTable.propTypes = {
  data: PropTypes.array,
  updateActionRowValue: PropTypes.func,
  handleClickApplyButton: PropTypes.func,
  onSelectTableRow: PropTypes.func,
  handleClickAddNewRecord: PropTypes.func,
  handleClickRemoveRecord: PropTypes.func,
  rowSelectedItem: PropTypes.object,
  errorMessage: PropTypes.string,
  onChangeNewValue: PropTypes.func,
  newAction: PropTypes.object,
};

export default CollectionActionsTable;
