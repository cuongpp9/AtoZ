import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SideBar } from 'components/arOperations';
import { RouteManager } from 'constantsApp';
import AdjustmentsIndex from './AdjustmentsIndex';
import DisputesIndex from './DisputesIndex';
import WriteOffsIndex from './WriteOffsIndex';
import ConfigIndex from './ConfigIndex';

class ArOperationsIndex extends React.PureComponent {
  getActiveRoute() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case RouteManager.arOperations.adjustment.name:
        return RouteManager.arOperations.adjustment.route;
      case RouteManager.arOperations.dispute.name:
        return RouteManager.arOperations.dispute.route;
      case RouteManager.arOperations.writeOff.name:
        return RouteManager.arOperations.writeOff.route;
      case RouteManager.arOperations.arOpsConfig.name:
        return RouteManager.arOperations.arOpsConfig.route;
      default:
        return '';
    }
  }

  renderContent() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case RouteManager.arOperations.adjustment.name:
        return <AdjustmentsIndex />;
      case RouteManager.arOperations.dispute.name:
        return <DisputesIndex />;
      case RouteManager.arOperations.writeOff.name:
        return <WriteOffsIndex />;
      case RouteManager.arOperations.arOpsConfig.name:
        return <ConfigIndex />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div
        className={classNames('ops-page', {
          'ops-page-index':
            this.getActiveRoute() !==
            RouteManager.arOperations.arOpsConfig.route,
          'ops-page-apply':
            this.getActiveRoute() ===
            RouteManager.arOperations.arOpsConfig.route,
        })}
      >
        <SideBar routeActive={this.getActiveRoute()} />
        {this.renderContent()}
      </div>
    );
  }
}

ArOperationsIndex.propTypes = {
  match: PropTypes.object,
};

export default ArOperationsIndex;
