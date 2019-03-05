import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { Row, Col, Button } from 'reactstrap';
import { getPackageDetail, getBundleDetail } from 'api';
import TableFormPriceUnit from './TableFormPriceUnit';

class ServiceUnit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLine: false,
      packageName: '',
      bundleName: '',
      needFetch: true,
    };
  }

  async getName(client) {
    const { serviceUnit } = this.props;
    if (serviceUnit.packageId) {
      const { data } = await client.query({
        query: getPackageDetail(serviceUnit.packageId),
      });
      if (data && data.getPackageById) {
        this.setState({
          packageName: data.getPackageById.name,
          needFetch: false,
        });
      }
    }

    if (serviceUnit.bundleId) {
      const { data } = await client.query({
        query: getBundleDetail(serviceUnit.bundleId),
      });
      if (data && data.getBundleById) {
        this.setState({
          bundleName: data.getBundleById.name,
          needFetch: false,
        });
      }
    }
  }

  showLine = () => {
    this.setState({ isLine: !this.state.isLine });
  };

  render() {
    const { serviceUnit, getPriceUnits, changeLines } = this.props;
    const { packageName, bundleName, isLine, needFetch } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          if (needFetch) {
            this.getName(client);
          }
          return (
            <tbody>
              <tr>
                <td>{serviceUnit.serviceId}</td>
                <td>{serviceUnit.serviceType}</td>
                <td>{serviceUnit.parentId}</td>
                <td>{serviceUnit.provisioningId}</td>
                <td>{serviceUnit.status}</td>
                <td>{serviceUnit.reason}</td>
                <td>{packageName}</td>
                <td>{bundleName}</td>
                <td className="td-style">
                  <Button
                    color={`${isLine ? 'secondary' : 'success'}`}
                    type="button"
                    onClick={() => this.showLine()}
                  >
                    {`${isLine ? 'Hide Lines' : 'Override Lines'}`}
                  </Button>
                </td>
              </tr>
              <tr className={`${isLine ? '' : 'field-none'}`}>
                <td colSpan={9}>
                  <div className="form-child-price-unit">
                    <div className="form-child-price-unit__header">
                      <Row>
                        <Col md={12}>
                          <h3 className="bold-text">Price Units</h3>
                        </Col>
                      </Row>
                    </div>
                    <TableFormPriceUnit
                      serviceUnitId={serviceUnit.serviceId}
                      id={serviceUnit.id}
                      dataPriceUnits={serviceUnit.lines}
                      getPriceUnits={getPriceUnits}
                      changeLines={changeLines}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          );
        }}
      </ApolloConsumer>
    );
  }
}

ServiceUnit.propTypes = {
  serviceUnit: PropTypes.object,
  getPriceUnits: PropTypes.func,
  changeLines: PropTypes.func,
};

export default ServiceUnit;
