import React from 'react';
import PropTypes from 'prop-types';
import { CardBody } from 'reactstrap';
import Line from './Line';

const headers = [
  'Action',
  'Status',
  'Reason',
  'Quatity',
  'Price Overrride',
  'Price Offset',
  'Discount Percent',
  'Price Offer Id',
  'Discount Offer Id',
  { name: 'Start Date' },
  { name: 'End Date' },
  'Relative Start',
  'Relative Start Unit',
  'Relative End',
  'Relative End Unit',
];

class TableFormLine extends React.Component {
  renderHeaderTable() {
    return (
      <thead>
        <tr>
          {headers.map(
            item =>
              item.name ? (
                <th scope="col" className="center resize-col" key={item.name}>
                  {item.name}
                </th>
              ) : (
                <th scope="col" className="center" key={item}>
                  {item}
                </th>
              ),
          )}
        </tr>
      </thead>
    );
  }

  renderRow = row => {
    const { parentName, serviceId, changeLines } = this.props;
    return (
      <Line
        key={row.id}
        parentName={parentName}
        serviceId={serviceId}
        changeLines={changeLines}
        line={row}
      />
    );
  };

  renderBody(data) {
    return <tbody>{data.map(this.renderRow)}</tbody>;
  }

  render() {
    const { lines } = this.props;
    return (
      <div className="table-form table-form-line">
        <CardBody>
          <table className="table table-bordered">
            {this.renderHeaderTable()}
            {lines && this.renderBody(lines)}
          </table>
        </CardBody>
      </div>
    );
  }
}

TableFormLine.propTypes = {
  lines: PropTypes.array,
  parentName: PropTypes.string,
  serviceId: PropTypes.string,
  changeLines: PropTypes.func,
};

export default TableFormLine;
