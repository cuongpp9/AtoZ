import React from 'react';
import PropTypes from 'prop-types';
import { SideBar } from 'components/arOperations';
import { RouteManager } from 'constantsApp';
import AdjustmentDetail from './AdjustmentDetail';
import DisputeDetail from './DisputeDetail';
import WriteOffDetail from './WriteOffDetail';
class ArOperationsDetail extends React.PureComponent {
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
      default:
        return '';
    }
  }

  renderContent() {
    const {
      match: {
        params: { childRoute, id },
      },
    } = this.props;
    switch (childRoute) {
      case RouteManager.arOperations.adjustment.name:
        return <AdjustmentDetail id={id} />;
      case RouteManager.arOperations.dispute.name:
        return <DisputeDetail id={id} />;
      case RouteManager.arOperations.writeOff.name:
        return <WriteOffDetail id={id} />;
      default:
        return <div />;
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

ArOperationsDetail.propTypes = {
  match: PropTypes.object,
};

export default ArOperationsDetail;
