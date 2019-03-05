import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableInfo from 'components/commons/TableInfo';

const heads = [
  {
    key: 'id',
    name: 'Id',
  },
  {
    key: 'accountId',
    name: 'Account Id',
  },
  {
    key: 'status',
    name: 'Status',
  },
  {
    key: 'reason',
    name: 'Reason',
  },
  {
    key: 'type',
    name: 'Type',
  },
  {
    key: 'parentId',
    name: 'Parent Id',
  },
  {
    key: 'provisioningId',
    name: 'Provisioning Id',
  },
  {
    key: 'bundleId',
    name: 'Bundle Id',
  },
  {
    key: 'packageId',
    name: 'Package Id',
  },
  {
    key: 'subscriptionId',
    name: 'Subscription Id',
  },
  {
    key: 'effectiveDate',
    name: 'Effective Date',
  },
];

class TableServiceUnits extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = (row, idx) => (
    <tr key={idx}>
      <td>{row.id}</td>
      <td>{row.accountId}</td>
      <td>{row.status}</td>
      <td>{row.reason}</td>
      <td>{row.type}</td>
      <td>{row.parentId}</td>
      <td>{row.provisioningId}</td>
      <td>{row.bundleId}</td>
      <td>{row.packageId}</td>
      <td>{row.subscriptionId}</td>
      <td>{row.effectiveDate}</td>
    </tr>
  );

  renderBody() {
    const { data, errorServiceUnits } = this.props;
    if (errorServiceUnits) {
      return (
        <tbody>
          <tr>
            <td colSpan={12} className="txt-error">
              {errorServiceUnits}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={12}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { data, title } = this.props;
    return (
      <TableInfo title={title} heads={heads}>
        {this.renderBody(data)}
      </TableInfo>
    );
  }
}

TableServiceUnits.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  errorServiceUnits: PropTypes.string,
};

export default TableServiceUnits;
