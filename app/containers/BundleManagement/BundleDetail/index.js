import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import { SideBar } from 'components/bundlemanagement';
import { RouteManager } from 'constantsApp';
import {
  getBundleDetail,
  getPackageDetail,
  getDependencyDetail,
} from '../actions';
import BundleEditForm from './BundleDetail/BundleEditForm';
import DependencyEditForm from './DependencyDetail/DependencyEditForm';
import PackageEditForm from './PackageDetail/PackageEditForm';
class DetailPage extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { childRoute },
      },
    } = props;
    this.state = {
      initRoute: childRoute || 'bundles',
    };
  }

  getActiveRoute() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case RouteManager.bundleManagement.bundle.name:
        return RouteManager.bundleManagement.bundle.route;
      case RouteManager.bundleManagement.dependency.name:
        return RouteManager.bundleManagement.dependency.route;
      case RouteManager.bundleManagement.package.name:
        return RouteManager.bundleManagement.package.route;
      default:
        return '';
    }
  }

  getAction(childRoute, id) {
    switch (childRoute) {
      case 'bundles':
        return this.props.getBundleDetail(id);
      case 'dependencies':
        return this.props.getDependencyDetail(id);
      case 'packages':
        return this.props.getPackageDetail(id);
      default:
        return this.props.getBundleDetail(id);
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id, childRoute },
      },
    } = this.props;
    this.getAction(childRoute, id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match !== nextProps.match) {
      const {
        match: {
          params: { childRoute },
        },
      } = nextProps;
      this.setState({
        initRoute: childRoute,
      });
    }
  }

  renderContent() {
    const { initRoute } = this.state;

    switch (initRoute) {
      case 'bundles':
        return <BundleEditForm />;
      case 'dependencies':
        return <DependencyEditForm />;
      case 'packages':
        return <PackageEditForm />;
      default:
        return <BundleEditForm />;
    }
  }

  render() {
    return (
      <div className="global-page pricing-page">
        <SideBar routeActive={this.getActiveRoute()} />
        <PageAbstract>{this.renderContent()}</PageAbstract>
      </div>
    );
  }
}

DetailPage.propTypes = {
  match: PropTypes.object,
  getBundleDetail: PropTypes.func,
  getPackageDetail: PropTypes.func,
  getDependencyDetail: PropTypes.func,
};

export default connect(
  null,
  {
    getBundleDetail,
    getPackageDetail,
    getDependencyDetail,
  },
)(DetailPage);
