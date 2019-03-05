import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import { getPackageDetail, getBundleDetail } from 'api';
class ServiceUnit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
    const { serviceUnit } = this.props;
    const { packageName, bundleName, needFetch } = this.state;
    return (
      <ApolloConsumer>
        {client => {
          if (needFetch) {
            this.getName(client);
          }
          return (
            <tr>
              <td>{serviceUnit.id}</td>
              <td>{serviceUnit.type}</td>
              <td>{serviceUnit.parentId}</td>
              <td>{serviceUnit.provisioningId}</td>
              <td>{serviceUnit.status}</td>
              <td>{serviceUnit.reason}</td>
              <td>{packageName}</td>
              <td>{bundleName}</td>
            </tr>
          );
        }}
      </ApolloConsumer>
    );
  }
}

ServiceUnit.propTypes = {
  serviceUnit: PropTypes.object,
};

export default ServiceUnit;
