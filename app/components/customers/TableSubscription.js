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
    key: 'initialTerm',
    name: 'Initial Term',
  },
  {
    key: 'initialTermUnit',
    name: 'Initial Term Unit',
  },
  {
    key: 'renewalTerm',
    name: 'Renewal Term',
  },
  {
    key: 'renewalTermUnit',
    name: 'Renewal Term Unit',
  },
  {
    key: 'trialTerm',
    name: 'Trial Term',
  },
  {
    key: 'trialTermUnit',
    name: 'Trial Term Unit',
  },
  {
    key: 'effectiveDate',
    name: 'Effective Date',
  },
];

class TableSubsciption extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = row => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.accountId}</td>
      <td>{row.status}</td>
      <td>{row.reason}</td>
      <td>{row.initialTerm}</td>
      <td>{row.initialTermUnit}</td>
      <td>{row.renewalTerm}</td>
      <td>{row.renewalTermUnit}</td>
      <td>{row.trialTerm}</td>
      <td>{row.trialTermUnit}</td>
      <td>{row.effectiveDate}</td>
    </tr>
  );

  renderBody() {
    const { data, errorSubscription } = this.props;

    if (errorSubscription) {
      return (
        <tbody>
          <tr>
            <td colSpan={11} className="txt-error">
              {errorSubscription}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data || !data.id) {
      return (
        <tbody>
          <tr>
            <td colSpan={11}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{this.renderRow(data)}</tbody>;
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

TableSubsciption.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  errorSubscription: PropTypes.string,
};

export default TableSubsciption;
