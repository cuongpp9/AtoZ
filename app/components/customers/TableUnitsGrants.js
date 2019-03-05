import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableInfo from 'components/commons/TableInfo';

const heads = [
  {
    key: 'index',
    name: 'Index',
  },
  {
    key: 'resourceId',
    name: 'Resource Id',
  },
  {
    key: 'grantAmount',
    name: 'Grant Amount',
  },
  {
    key: 'amountUsed',
    name: 'Amount Used',
  },
  {
    key: 'startDate',
    name: 'Start Date',
  },
  {
    key: 'endDate',
    name: 'End Date',
  },
];

class TableUnitsGrants extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = row => (
    <tr key={row.id}>
      <td>{row.index}</td>
      <td>{row.resourceId}</td>
      <td>{row.grantAmount}</td>
      <td>{row.amountUsed}</td>
      <td>{row.startDate}</td>
      <td>{row.endDate}</td>
    </tr>
  );

  renderBody() {
    const { data, errorBalanceUnit } = this.props;
    if (errorBalanceUnit) {
      return (
        <tbody>
          <tr>
            <td colSpan={3} className="txt-error">
              {errorBalanceUnit}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={3}>No record has found!</td>
          </tr>
        </tbody>
      );
    }
    console.log('data row', data);
    return <tbody>{data && data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { data } = this.props;
    return (
      <TableInfo title="Grants" heads={heads}>
        {this.renderBody(data)}
      </TableInfo>
    );
  }
}

TableUnitsGrants.propTypes = {
  data: PropTypes.array,
  errorBalanceUnit: PropTypes.string,
};

export default TableUnitsGrants;
