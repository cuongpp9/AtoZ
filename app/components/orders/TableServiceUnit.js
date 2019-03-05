import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';
import ServiceUnit from './components/ServiceUnit';
const headers = [
  'Id',
  'Type',
  'Parent Id',
  'Status',
  'Reason',
  'Provisioning Id',
  'Package',
  'Bundle',
];

class TableServiceUnits extends PureComponent {
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

    if (!data || !data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={12}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {data.map((item, id) => (
          <ServiceUnit key={`${item.id}-${id}`} serviceUnit={item} />
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div className="table-form table-form-service-unit">
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

TableServiceUnits.propTypes = {
  data: PropTypes.array,
  errorServiceUnits: PropTypes.string,
};

export default TableServiceUnits;
