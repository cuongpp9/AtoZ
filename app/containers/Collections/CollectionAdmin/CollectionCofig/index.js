import React from 'react';

import { connect } from 'react-redux';

import { PageAbstract } from 'components/commons';
import {} from 'components/collections';
import { FormCollapse } from 'components/form';
import { btnCollapse } from 'constantsApp';
import CollectionActions from './CollectionActions';
import CollectionSchedule from './CollectionSchedule';
import CollectionAgent from './CollectionAgent';

class CollectionCofig extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      activeTab: { name: btnCollapse.collections[0].state, isActive: true },
    };
  }

  componentDidMount() {}

  onToggleTab = activeTabName => {
    const { activeTab } = this.state;
    if (activeTab.name === activeTabName) {
      this.setState({
        activeTab: { name: activeTabName, isActive: !activeTab.isActive },
      });
    } else {
      this.setState({ activeTab: { name: activeTabName, isActive: true } });
    }
  };

  renderItem = item => {
    switch (item.id) {
      case 1:
        return <CollectionActions />;
      case 2:
        return <CollectionSchedule />;
      case 3:
        return <CollectionAgent />;
      default:
        return null;
    }
  };
  render() {
    const { activeTab } = this.state;

    return (
      <PageAbstract title="">
        {btnCollapse.collections.map(item => (
          <FormCollapse
            key={item.id}
            title={item.title}
            isActive={item.state === activeTab.name && activeTab.isActive}
            onToggleTab={this.onToggleTab}
            state={item.state}
          >
            {this.renderItem(item)}
          </FormCollapse>
        ))}
      </PageAbstract>
    );
  }
}
CollectionCofig.propTypes = {};
export default connect(
  null,
  {},
)(CollectionCofig);
