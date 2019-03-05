import React from 'react';
import PropTypes from 'prop-types';
import { PageAbstract } from 'components/commons';
import { SideBar } from 'components/bundlemanagement';
import { RouteManager } from 'constantsApp';
import CreateBundle from './bundle';
import CreatePackage from './package';
import CreateDependency from './dependency';

class CreatePricingManager extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { childRoute },
      },
    } = props;
    this.state = {
      initRoute: childRoute || 'bundles',
      titlePage: 'Create New Bundle',
    };
  }
  componentDidMount() {
    this.setInfo(this.state.initRoute);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match !== nextProps.match) {
      const {
        match: {
          params: { childRoute },
        },
      } = nextProps;
      this.setInfo(childRoute);
    }
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

  setInfo(childRoute) {
    switch (childRoute) {
      case 'bundles':
        this.setState({
          titlePage: 'Creare New Bundle',
        });
        break;
      case 'packages':
        this.setState({
          titlePage: 'Creare New Package',
        });
        break;
      case 'dependencies':
        this.setState({
          titlePage: 'Creare New Dependency',
        });
        break;
      default:
        this.setState({
          titlePage: 'Creare New Bundle',
        });
        break;
    }
  }

  renderForm() {
    const { initRoute } = this.state;
    switch (initRoute) {
      case 'bundles':
        return <CreateBundle />;
      case 'packages':
        return <CreatePackage />;
      case 'dependencies':
        return <CreateDependency />;
      default:
        return <CreateBundle />;
    }
  }

  render() {
    const { titlePage } = this.state;
    return (
      <div className="global-page pricing-page">
        <SideBar routeActive={this.getActiveRoute()} />
        <PageAbstract title={titlePage}>{this.renderForm()}</PageAbstract>
      </div>
    );
  }
}
CreatePricingManager.propTypes = {
  match: PropTypes.object,
};

export default CreatePricingManager;
