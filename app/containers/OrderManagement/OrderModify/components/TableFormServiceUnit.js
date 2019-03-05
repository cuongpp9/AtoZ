import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';
import ServiceUnit from './ServiceUnit';
const headers = [
  'Id',
  'Type',
  'Parent Id',
  'Provisioning Id',
  'Status',
  'Reason',
  'Package',
  'Bundle',
  '',
];

class TableFormServiceUnits extends PureComponent {
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
    const { data, errorServiceUnits, getPriceUnits, changeLines } = this.props;
    if (errorServiceUnits) {
      return (
        <tbody>
          <tr>
            <td colSpan={9} className="txt-error">
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
            <td colSpan={9}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return data.map((item, id) => (
      <ServiceUnit
        key={`${item.id}-${id}`}
        serviceUnit={item}
        getPriceUnits={getPriceUnits}
        changeLines={changeLines}
      />
    ));
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

TableFormServiceUnits.propTypes = {
  data: PropTypes.array,
  errorServiceUnits: PropTypes.string,
  getPriceUnits: PropTypes.func,
  changeLines: PropTypes.func,
};

export default TableFormServiceUnits;
