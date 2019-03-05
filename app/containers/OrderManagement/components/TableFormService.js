import React from 'react';
import { CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { FormGroup } from 'components/form';

const headers = [
  'Provisioning Id',
  'Action',
  'Status',
  'Reason',
  'Package Name',
  'Bundle Name',
];

class TableFormService extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  renderHeaderTable() {
    return (
      <thead>
        <tr>{headers.map(item => <th key={item}>{item}</th>)}</tr>
      </thead>
    );
  }

  renderRow = () => {
    const { service, bundleName, packageName } = this.props;
    return (
      <tr>
        <td>
          <FormGroup title="">
            <input
              name="provisioningId"
              type="text"
              value={service.provisioningId}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="action"
              value={service.action}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              name="status"
              value={service.status}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input name="reason" type="text" disabled />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              type="text"
              value={service.packageName || packageName}
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
        <td>
          <FormGroup title="">
            <input
              type="text"
              value={bundleName || ''}
              placeholder="Bundle Name"
              onChange={() => {}}
              disabled
            />
          </FormGroup>
        </td>
      </tr>
    );
  };

  renderBody() {
    return <tbody>{this.renderRow()}</tbody>;
  }

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

TableFormService.propTypes = {
  service: PropTypes.object,
  bundleName: PropTypes.string,
  packageName: PropTypes.string,
};

export default TableFormService;
