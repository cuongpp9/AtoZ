import React from 'react';
import PropTypes from 'prop-types';
import { SideBar } from 'components/arOperations';
import { RouteManager } from 'constantsApp';
import AdjustmentApply from './AdjustmentApply';
import DisputeApply from './DisputeApply';
import WriteOffsAplly from './WriteOffsApply';
import SettleAdispute from './SettleADispute';
import ReverseWriteOff from './ReverseWriteOff';
class ArOperationsApply extends React.PureComponent {
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
      case RouteManager.arOperations.settlement.name:
        return RouteManager.arOperations.dispute.route;
      case RouteManager.arOperations.writeOff.name:
      case RouteManager.arOperations.reverseWriteOffs.name:
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
        return <AdjustmentApply />;
      case RouteManager.arOperations.dispute.name:
        return <DisputeApply />;
      case RouteManager.arOperations.settlement.name:
        return <SettleAdispute />;
      case RouteManager.arOperations.writeOff.name:
        return <WriteOffsAplly />;
      case RouteManager.arOperations.reverseWriteOffs.name:
        return <ReverseWriteOff />;
      default:
        return null;
    }
  }
  render() {
    return (
      <div className="ops-page ops-page-apply">
        <SideBar routeActive={this.getActiveRoute()} />
        {this.renderContent()}
      </div>
    );
  }
}

ArOperationsApply.propTypes = {
  match: PropTypes.object,
};

export default ArOperationsApply;
