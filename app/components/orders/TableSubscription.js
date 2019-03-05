import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';

const headers = [
  'Effective Date',
  'Status',
  'Reason',
  'Initial Term',
  'Initial Term Unit',
  'Renewal Term',
  'Renewal Term Unit',
  'Trial Term',
  'Trial Term Unit',
];

class TableSubsciption extends PureComponent {
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

  renderRow = row => (
    <tr key={row.id}>
      <td>{row.effectiveDate}</td>
      <td>{row.status}</td>
      <td>{row.reason}</td>
      <td>{row.initialTerm}</td>
      <td>{row.initialTermUnit}</td>
      <td>{row.renewalTerm}</td>
      <td>{row.renewalTermUnit}</td>
      <td>{row.trialTerm}</td>
      <td>{row.trialTermUnit}</td>
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
    return (
      <div className="table-subscription">
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

TableSubsciption.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
  errorSubscription: PropTypes.string,
};

export default TableSubsciption;
