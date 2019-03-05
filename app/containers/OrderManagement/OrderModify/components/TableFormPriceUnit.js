import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeGetPriceUnits, makeGetErrorPriceUnits } from '../../selectors';
import { getPriceUnitsByServiceUnitId } from '../../actions';
import PriceUnit from './PriceUnit';
const headers = [
  'Action',
  'Status',
  'Quatity',
  'Price Override',
  'Price Offset',
  'Discount Percent',
  'Price Offer Id',
  'Discount Offer Id',
  'Start Date',
  'End Date',
];

class TableFormPriceUnit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { serviceUnitId, priceUnits, getPriceUnits } = this.props;
    if (serviceUnitId) {
      // this.props.getPriceUnitsByServiceUnitId(serviceUnitId);
    }
    if (priceUnits) {
      // getPriceUnits(priceUnits, serviceUnitId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.serviceUnitId &&
      this.props.serviceUnitId !== nextProps.serviceUnitId
    ) {
      // this.props.getPriceUnitsByServiceUnitId(nextProps.serviceUnitId);
    }
    if (
      nextProps.priceUnits &&
      this.props.priceUnits !== nextProps.priceUnits
    ) {
      // this.props.getPriceUnits(nextProps.priceUnits, nextProps.serviceUnitId);
    }
  }

  renderHeaderTable() {
    return (
      <thead>
        <tr>
          {headers.map(item => (
            <th scope="col" className="center" key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  renderBody() {
    const { dataPriceUnits, id, errorPriceUnits, changeLines } = this.props;
    if (errorPriceUnits) {
      return (
        <tbody>
          <tr>
            <td colSpan={10} className="txt-error">
              {errorPriceUnits}
            </td>
          </tr>
        </tbody>
      );
    }
    if (!dataPriceUnits || !dataPriceUnits.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={10} className="w-25 p-3">
              No record has found!
            </td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {dataPriceUnits.map(item => (
          <PriceUnit
            key={item.id}
            data={item}
            serviceId={id}
            changeLines={changeLines}
          />
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div className="table-form table-form-price-unit">
        <CardBody>
          <div className="table-responsive">
            <table className="table table-bordered">
              {this.renderHeaderTable()}
              {this.renderBody()}
            </table>
          </div>
        </CardBody>
      </div>
    );
  }
}

TableFormPriceUnit.propTypes = {
  serviceUnitId: PropTypes.string,
  dataPriceUnits: PropTypes.array,
  getPriceUnits: PropTypes.func,
  getPriceUnitsByServiceUnitId: PropTypes.func,
  priceUnits: PropTypes.array,
  errorPriceUnits: PropTypes.string,
  changeLines: PropTypes.func,
  id: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  priceUnits: makeGetPriceUnits() || [],
  errorPriceUnits: makeGetErrorPriceUnits() || '',
});
export default connect(
  mapStateToProps,
  {
    getPriceUnitsByServiceUnitId,
  },
)(TableFormPriceUnit);
