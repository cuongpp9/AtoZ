/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ApolloConsumer } from 'react-apollo';
import { Row, Col } from 'reactstrap';
import { getBundleByBundleId } from 'api';
import ServiceForm from './ServiceForm';

class OrderService extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bundleName: props.service.bundleName || '',
      needFetch: true,
    };
  }

  async getBundleInfo(client) {
    const { service, addLinesPackage, hasFetchBundle } = this.props;
    if (hasFetchBundle) {
      const { data } = await client.query({
        query: getBundleByBundleId(service.bundleId),
      });
      const bundle = data.getBundleById;
      if (bundle) {
        this.setState({
          bundleName: bundle.name,
          needFetch: false,
        });
        addLinesPackage(bundle.components, service.id);
      }
    }
  }

  render() {
    const {
      aSelectedId,
      index,
      serviceType,
      changeLines,
      parentName,
      service,
    } = this.props;

    const { bundleName, needFetch } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          if (needFetch) {
            this.getBundleInfo(client);
          }
          return (
            <div className="form-section form-section-service">
              <div className="form-section-service__header">
                <Row>
                  <Col md={12}>
                    <h3 className="bold-text">
                      Services &nbsp;&nbsp;
                      <span className="account-detail">
                        {service.serviceType}
                      </span>&nbsp;&nbsp;&nbsp;&nbsp;
                      {index === 0 && (
                        <p>
                          <span className="account-detail">
                            Account Number:
                          </span>&nbsp;&nbsp;
                          <span className="account-detail">{aSelectedId}</span>
                        </p>
                      )}
                    </h3>
                  </Col>
                </Row>
              </div>
              <ServiceForm
                bundleName={bundleName}
                changeLines={changeLines}
                parentName={parentName}
                service={service}
              />
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

OrderService.propTypes = {
  index: PropTypes.number,
  aSelectedId: PropTypes.string,
  serviceType: PropTypes.string,
  addLinesPackage: PropTypes.func,
  changeLines: PropTypes.func,
  parentName: PropTypes.string,
  hasFetchBundle: PropTypes.bool,
  service: PropTypes.object,
};

OrderService.defaultProps = {
  hasFetchBundle: false,
};

export default connect()(OrderService);
