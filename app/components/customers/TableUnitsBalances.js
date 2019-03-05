import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableInfo from 'components/commons/TableInfo';

const heads = [
  {
    key: 'currencyId',
    name: 'Currency Id',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
  {
    key: 'creditLimit',
    name: 'Credit Limit',
  },
];

class TableUnitsBalances extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = (row, idx) => (
    <tr key={idx}>
      <td>{row.currencyId}</td>
      <td>{row.amount}</td>
      <td>{row.creditLimit}</td>
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
      <TableInfo title="Balances" heads={heads}>
        {this.renderBody(data)}
      </TableInfo>
    );
  }
}

TableUnitsBalances.propTypes = {
  data: PropTypes.array,
  errorBalanceUnits: PropTypes.string,
};

export default TableUnitsBalances;
