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
    key: 'priceOfferId',
    name: 'Price Offer Id',
  },
  {
    key: 'subscriptionId',
    name: 'Subscription Id',
  },
  {
    key: 'serviceUnitId',
    name: 'Service Unit Id',
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
    key: 'status',
    name: 'Status',
  },
  {
    key: 'serviceType',
    name: 'Service Type',
  },
  {
    key: 'priceOverride',
    name: 'Price Override',
  },
  {
    key: 'priceOffset',
    name: 'Price Offset',
  },
  {
    key: 'discountPercent',
    name: 'Discount Percent',
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

class TablePriceUnits extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = (row, idx) => (
    <tr key={idx}>
      <td>{row.id}</td>
      <td>{row.accountId}</td>
      <td>{row.priceOfferId}</td>
      <td>{row.subscriptionId}</td>
      <td>{row.serviceUnitId}</td>
      <td>{row.bundleId}</td>
      <td>{row.packageId}</td>
      <td>{row.status}</td>
      <td>{row.serviceType}</td>
      <td>{row.priceOverride}</td>
      <td>{row.priceOffset}</td>
      <td>{row.discountPercent}</td>
      <td>{row.startDate}</td>
      <td>{row.endDate}</td>
    </tr>
  );

  renderBody() {
    const { data, errorPriceUnits } = this.props;
    if (errorPriceUnits) {
      return (
        <tbody>
          <tr>
            <td colSpan={14} className="txt-error">
              {errorPriceUnits}
            </td>
          </tr>
        </tbody>
      );
    }

    if (!data.length) {
      return (
        <tbody>
          <tr>
            <td colSpan={14}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { data } = this.props;
    return (
      <TableInfo title="Price Units" heads={heads}>
        {this.renderBody(data)}
      </TableInfo>
    );
  }
}

TablePriceUnits.propTypes = {
  data: PropTypes.array,
  errorPriceUnits: PropTypes.string,
};

export default TablePriceUnits;
