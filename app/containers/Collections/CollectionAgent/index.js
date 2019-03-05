import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SideBar1 } from 'components/collections';
import SearchAccounts from './SearchAccounts';
import CollectionHistory from './CollectionHistory';
import CollectionHistoryDetail from './CollectionHistoryDetail';
import BillUnits from './ShowBillUnits';

class CollectionAgent extends React.PureComponent {
  getActiveRoute() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case 'search-accounts':
        return '/collections/collection-agent/search-accounts';
      case 'invoice-units':
        return '/collections/collection-agent/invoice-units';
      case 'collection-history':
        return '/collections/collection-agent/collection-history';
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
      case 'search-accounts':
        return <SearchAccounts />;
      case 'invoice-units':
        return <BillUnits />;
      case 'collection-history':
        if (!id) return <CollectionHistory />;
        return <CollectionHistoryDetail id={id} />;
      default:
        return <SearchAccounts />;
    }
  }

  render() {
    const {
      match: {
        params: { id, childRoute },
      },
    } = this.props;
    return (
      <div
        className={classnames('collection-page', {
          'accounts-in-collection': id || childRoute === 'invoice-units',
        })}
      >
        <SideBar1 routeActive={this.getActiveRoute()} />
        {this.renderContent()}
      </div>
    );
  }
}

CollectionAgent.propTypes = {
  match: PropTypes.object,
};

export default CollectionAgent;
