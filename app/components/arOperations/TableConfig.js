import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, Button } from 'reactstrap';
import { SelectField } from 'components/form';
import { arOpsSelect } from 'constantsApp';
import DynamicInput from '../commons/DynamicInput';
import DynamicSelect from '../commons/DynamicSelect';

class TableConfig extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = (row, index) => (
    <tr
      key={index}
      onClick={() => this.props.onSelectReason(row)}
      className={
        this.props.reasonSelected && this.props.reasonSelected === row
          ? 'column_active'
          : null
      }
    >
      <DynamicSelect
        value={{ value: row.type, label: row.type }}
        options={arOpsSelect.type}
        name="type"
        index={index}
        onUpdateValue={this.props.onUpdateValue}
      />
      <DynamicSelect
        value={{ value: row.reasonCode, label: row.reasonCode }}
        options={arOpsSelect.reason}
        name="reasonCode"
        index={index}
        onUpdateValue={this.props.onUpdateValue}
      />
      <DynamicInput
        value={row.taxCode}
        name="taxCode"
        index={index}
        onUpdateValue={this.props.onUpdateValue}
      />
      <DynamicInput
        value={row.gLAccount}
        name="gLAccount"
        index={index}
        onUpdateValue={this.props.onUpdateValue}
      />
    </tr>
  );

  renderHeader() {
    return (
      <tr>
        <th scope="col">AR Type</th>
        <th scope="col">Reason Code</th>
        <th scope="col">Tax Code</th>
        <th scope="col">GL Account</th>
      </tr>
    );
  }

  renderBody() {
    const { data } = this.props;

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={4}>There are no record!</td>
          </tr>
        </tbody>
      );
    }
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const {
      itemNew,
      updateItemNewValue,
      addNewReason,
      reasonSelected,
      removeSelectedReason,
    } = this.props;
    const enableRemove = !!reasonSelected.reasonCode;
    const enableAddBtn = itemNew.type && itemNew.reasonCode;

    return (
      <Col md={12} lg={12}>
        <Card>
          <div className="select-table-block">
            <CardBody>
              <table
                className="table table-hover table-bordered"
                style={{
                  borderTop: '4px solid rgb(55, 188, 155)',
                  tableLayout: 'fixed',
                  width: '100%',
                }}
              >
                <thead>{this.renderHeader()}</thead>
                {this.renderBody()}
              </table>
            </CardBody>
          </div>
          <div className="select-table-block">
            <CardBody>
              <Row className="ml-5">
                <Col md={3}>
                  <div>
                    <b>ARType</b>
                  </div>
                  <div className="form__form-group-field form mt-2">
                    <SelectField
                      name="type"
                      options={arOpsSelect.type}
                      placeholder="AR Type"
                      className="form__form-group-select"
                      valueSelected={
                        itemNew.type
                          ? { value: itemNew.type, label: itemNew.type }
                          : null
                      }
                      onChange={val => updateItemNewValue('type', val.value)}
                      required
                      isClearable
                    />
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <b>Reason Code</b>
                  </div>
                  <div className="form__form-group-field form mt-2">
                    <SelectField
                      name="reasonCode"
                      options={arOpsSelect.reason}
                      placeholder="Reason Code"
                      className="form__form-group-select"
                      valueSelected={
                        itemNew.reasonCode
                          ? {
                              value: itemNew.reasonCode,
                              label: itemNew.reasonCode,
                            }
                          : null
                      }
                      onChange={val =>
                        updateItemNewValue('reasonCode', val.value)
                      }
                      required
                      isClearable
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div>
                    <b>Tax Code</b>
                  </div>
                  <div className="form__form-group-field form mt-2">
                    <input
                      type="text"
                      name="taxCode"
                      value={itemNew.taxCode}
                      onChange={evt =>
                        updateItemNewValue('taxCode', evt.target.value)
                      }
                    />
                  </div>
                </Col>
                <Col md={2}>
                  <div>
                    <b>GL Account</b>
                  </div>
                  <div className="form__form-group-field form mt-2">
                    <input
                      type="text"
                      name="gLAccount"
                      value={itemNew.gLAccount}
                      onChange={evt =>
                        updateItemNewValue('gLAccount', evt.target.value)
                      }
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </div>
          <div className="table__action">
            <Row className="mr-5">
              <div className="ml-auto">
                <Button
                  color="primary"
                  disabled={!enableRemove}
                  onClick={() => removeSelectedReason()}
                  style={{ padding: '.375rem .75rem' }}
                >
                  Remove Reason
                </Button>
              </div>
              <div className="ml-3 ">
                <Button
                  color="primary"
                  onClick={() => addNewReason()}
                  style={{ padding: '.375rem .75rem' }}
                  disabled={!enableAddBtn}
                >
                  + Add New Reason
                </Button>
              </div>
            </Row>
            <Row className="mr-5 mt-3 mb-3">
              <div className="ml-auto ">
                <Button
                  color="primary"
                  onClick={this.props.handleClickApplyButton}
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

TableConfig.propTypes = {
  data: PropTypes.array,
  itemNew: PropTypes.object,
  updateItemNewValue: PropTypes.func,
  handleClickApplyButton: PropTypes.func,
  addNewReason: PropTypes.func,
  onSelectReason: PropTypes.func,
  reasonSelected: PropTypes.object,
  removeSelectedReason: PropTypes.func,
  onUpdateValue: PropTypes.func,
};

export default TableConfig;
