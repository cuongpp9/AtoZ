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
    key: 'amount',
    name: 'Amount',
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

class TableUnitsAccumulator extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = row => (
    <tr key={row.id}>
      <td>{row.index}</td>
      <td>{row.resourceId}</td>
      <td>{row.amount}</td>
      <td>{row.startDate}</td>
      <td>{row.endDate}</td>
    </tr>
  );

  renderBody() {
    const { data, errorBalanceUnits } = this.props;
    if (errorBalanceUnits) {
      return (
        <tbody>
          <tr>
            <td colSpan={6} className="txt-error">
              {errorBalanceUnits}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={6}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{data && data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { data } = this.props;
    return (
      <TableInfo title="Accumulator" heads={heads}>
        {this.renderBody(data)}
      </TableInfo>
    );
  }
}

TableUnitsAccumulator.propTypes = {
  data: PropTypes.array,
  errorBalanceUnits: PropTypes.string,
};

export default TableUnitsAccumulator;
