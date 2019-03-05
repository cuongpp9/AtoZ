import React from 'react';
import { connect } from 'react-redux';
import { PageAbstract } from 'components/commons';
import {} from 'components/collections';
import { FormCollapse } from 'components/form';
import { btnCollapse } from 'constantsApp';
import PaymentTerm from './PaymentTerm';
import MerchantAccount from './MerchantAccount';
import PaymentTypes from './PaymentTypes';
import {} from '../../actions';

class PaymentCofig extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      activeTab: {
        name: btnCollapse.paymentConfiguration[0].state,
        isActive: true,
      },
    };
  }

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
        return <MerchantAccount />;
      case 2:
        return <PaymentTypes />;
      case 3:
        return <PaymentTerm />;
      default:
        return null;
    }
  };

  render() {
    const { activeTab } = this.state;
    return (
      <PageAbstract title="">
        {btnCollapse.paymentConfiguration.map(item => (
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

PaymentCofig.propTypes = {};

export default connect(
  null,
  {},
)(PaymentCofig);
