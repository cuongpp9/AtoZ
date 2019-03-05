import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { Row, Col } from 'reactstrap';
import { getPackageDetail, getBundleDetail } from 'api';
import { ServiceForm } from '../../components';
class ServiceEditForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bundleName: '',
      packageName: '',
      needFetch: true,
    };
  }

  async getName(client) {
    const { service } = this.props;
    if (service.packageId) {
      const { data } = await client.query({
        query: getPackageDetail(service.packageId),
      });
      if (data && data.getPackageById) {
        this.setState({
          packageName: data.getPackageById.name,
          needFetch: false,
        });
      }
    }

    if (service.bundleId) {
      const { data } = await client.query({
        query: getBundleDetail(service.bundleId),
      });
      if (data && data.getBundleById) {
        this.setState({
          bundleName: data.getBundleById.name,
          needFetch: false,
        });
      }
    }
  }

  render() {
    const {
      service,
      changeLines,
      parentName,
      disabledBtnOverrideLine,
    } = this.props;
    const { packageName, bundleName, needFetch } = this.state;

    return (
      <ApolloConsumer>
        {client => {
          if (needFetch) {
            this.getName(client);
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
                      </span>
                    </h3>
                  </Col>
                </Row>
              </div>
              <ServiceForm
                bundleName={bundleName}
                packageName={packageName}
                changeLines={changeLines}
                service={service}
                parentName={parentName}
                disabledBtnOverrideLine={disabledBtnOverrideLine}
              />
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

ServiceEditForm.propTypes = {
  parentName: PropTypes.string,
  changeLines: PropTypes.func,
  service: PropTypes.object,
  disabledBtnOverrideLine: PropTypes.bool,
};

ServiceEditForm.defaultProps = {
  disabledBtnOverrideLine: false,
};

export default ServiceEditForm;
