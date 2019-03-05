import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SideBar } from 'components/collections';
import CollectionCofig from './CollectionCofig';
import AccountsInCollection from './AccountsInCollection';
import AgentSumaryActivity from './AgentSumaryActivity';

class CollectionAdmin extends React.PureComponent {
  renderContent() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;
    switch (childRoute) {
      case 'collection-config':
        return <CollectionCofig />;
      case 'accounts-in-collection':
        return <AccountsInCollection />;
      case 'agent-activity-summary':
        return <AgentSumaryActivity />;
      default:
        return <div />;
    }
  }
  render() {
    const {
      match: {
        params: { childRoute },
      },
    } = this.props;

    return (
      <div
        className={classnames('collection-page', {
          'accounts-in-collection':
            childRoute === 'accounts-in-collection' ||
            childRoute === 'agent-activity-summary',
        })}
      >
        <SideBar />
        {this.renderContent()}
      </div>
    );
  }
}

CollectionAdmin.propTypes = {
  match: PropTypes.object,
};

export default CollectionAdmin;
