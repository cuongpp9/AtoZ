import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { PageAbstract, ErrorDetail } from 'components/commons';
import { SideBar } from 'components/customers';
import { Messages } from 'constantsApp';
import { formatStringUrl } from 'utils/utils';
import {
  selectAccountId,
  getAccountDetail as getAccountParent,
} from 'containers/App/actions';
import {
  Contacts,
  Addresses,
  PaymentProfiles,
  BillingProfiles,
  Services,
  Assets,
  Balances,
  Bills,
  Transactions,
  CustomerActivity,
  Hierarchy,
  CustomAttributes,
  AccountInfoForm,
} from './detail';
import { makeAccountDetail, makeErrorMessage } from '../selectors';
import {
  getAccountDetail,
  modifyAccount,
  updateAccountStatus,
} from '../actions';

class CustomerDetailPage extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { childRoute, id },
      },
    } = props;
    this.state = {
      initRoute: childRoute || 'info',
      parentAccount: {},
      childrenAcct: [],
      page: 1,
      size: 10,
    };
    this.filterChildren = { parentId: `${id}` };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.props.getAccountDetail(id);
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
    if (this.props.accountDetail !== nextProps.accountDetail && nextProps.accountDetail.id) {
      const { page, size } = this.state;
      if (nextProps.accountDetail.parentId) {
        this.props.getAccountParent(nextProps.accountDetail.parentId, ({ data }) => {
          if (data) {
            this.setState({ parentAccount: data });
          }
        })
      } else {
        this.props.selectAccountId({ page, size, filter: this.filterChildren }, ({ data }) => {
          this.setState({ childrenAcct: data || [] });
        })
      }
    }
  }

  setTitle = childRoute => {
    switch (childRoute) {
      case 'info':
        return 'Account';
      case 'contacts':
        return 'Contacts';
      case 'addresses':
        return 'Addresses';
      case 'payment-profile':
        return 'Payment Profile';
      case 'billing-profile':
        return 'Billing Profile';
      case 'services':
        return 'Services';
      case 'assets':
        return 'Assets';
      case 'balances':
        return 'Balances';
      case 'bills':
        return 'Bills';
      case 'transactions':
        return 'Transactions';
      case 'activities':
        return 'Customer Activity';
      case 'hierarchy': {
        const { parentAccount } = this.state;
        if (parentAccount && parentAccount.id) {
          return 'Parent Account';
        }
        return 'Non-Paying Account';
      }
      case 'custom-attributes':
        return 'Custom Attributes';
      default:
        return 'Account';
    }
  };

  getContactsFromParent(accountParent) {
    if (!accountParent || !accountParent.contacts) return [];
    return accountParent.contacts;
  }

  getAddressesFromParent(accountParent) {
    if (!accountParent || !accountParent.addresses) return [];
    return accountParent.addresses;
  }

  handlePageChildren = pageOffset => {
    const { page, size } = this.state;
    this.setState({ page: page + pageOffset})
    this.props.selectAccountId({ page: page + pageOffset, size, filter: this.filterChildren }, ({ data }) => {
      this.setState({ childrenAcct: data || [] });
    })
  };

  handleSizeChildren = size => {
    const { page } = this.state;
    this.setState({ size });
    this.props.selectAccountId({ page, size, filter: this.filterChildren }, ({ data }) => {
      this.setState({ childrenAcct: data || [] });
    })
  };

  renderContent() {
    const { initRoute, parentAccount, childrenAcct, page, size } = this.state;
    const {
      accountDetail,
      match: {
        params: { id },
      },
      errorMessage,
    } = this.props;

    if (!accountDetail) {
      return (
        <ErrorDetail msg={formatStringUrl(Messages.noAccountDetail, id)} />
      );
    }

    if (errorMessage) {
      return <ErrorDetail msg={errorMessage} />;
    }

    let isNonPaying = false;
    if (accountDetail.paymentProfiles && accountDetail.paymentProfiles.length) {
      isNonPaying =
        accountDetail.paymentProfiles[0].paymentMethod === 'NON_PAYING';
    }

    switch (initRoute) {
      case 'info':
        return (
          <AccountInfoForm
            account={accountDetail}
            modifyAccount={this.props.modifyAccount}
            updateAccountStatus={this.props.updateAccountStatus}
          />
        );
      case 'contacts': {
        let contacts = [];
        let referenceParentContact = false;
        if (!accountDetail.contacts) {
          contacts = [];
        } else if (accountDetail.contacts.length) {
          // eslint-disable-next-line prefer-destructuring
          contacts = accountDetail.contacts;
        } else {
          contacts = this.getContactsFromParent(parentAccount);
          referenceParentContact = true;
        }
        return (
          <Contacts
            contacts={contacts}
            accountId={accountDetail.id}
            modifyAccount={this.props.modifyAccount}
            referenceParentContact={referenceParentContact}
          />
        );
      }
      case 'addresses': {
        let addresses = [];
        let referenceParentAddress = false;
        if (!accountDetail.addresses) {
          addresses = [];
        } else if (accountDetail.addresses.length) {
          // eslint-disable-next-line prefer-destructuring
          addresses = accountDetail.addresses;
        } else {
          addresses = this.getAddressesFromParent(parentAccount);
          referenceParentAddress = true;
        }
        return (
          <Addresses
            addresses={addresses}
            accountId={accountDetail.id}
            modifyAccount={this.props.modifyAccount}
            referenceParentAddress={referenceParentAddress}
          />
        );
      }
      case 'payment-profile':
        return (
          <PaymentProfiles
            account={accountDetail}
            modifyAccount={this.props.modifyAccount}
            isNonPaying={isNonPaying}
          />
        );
      case 'billing-profile':
        return (
          <BillingProfiles
            account={accountDetail}
            modifyAccount={this.props.modifyAccount}
            isNonPaying={isNonPaying}
          />
        );
      case 'services':
        return <Services />;
      case 'assets':
        return <Assets />;
      case 'balances':
        return <Balances />;
      case 'bills':
        return <Bills id={id} />;
      case 'transactions':
        return <Transactions id={id} />;
      case 'activities':
        return <CustomerActivity />;
      case 'hierarchy': {
        return (
          <Hierarchy
            account={accountDetail}
            parentAccount={parentAccount}
            childrenAcct={childrenAcct}
            pageChildren={page}
            sizeChildren={size}
            handlePageChildren={this.handlePageChildren}
            handleSizeChildren={this.handleSizeChildren}
          />
        );
      }
      case 'custom-attributes':
        return <CustomAttributes />;
      default:
        return (
          <AccountInfoForm
            account={accountDetail}
            modifyAccount={this.props.modifyAccount}
            updateAccountStatus={this.props.updateAccountStatus}
          />
        );
    }
  }

  render() {
    const {
      match: {
        params: { id, childRoute },
      },
    } = this.props;
    const title = this.setTitle(childRoute);
    return (
      <div className="global-page customer-page">
        <SideBar isShowSidebarItem id={id} />
        <PageAbstract title="">
          <div className="table-title table-title-form table-title-form-detail">
            <Row>
              <Col md={12}>
                <h3 className="bold-text">
                  {title} &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="account-detail">
                    Account Number:
                  </span>&nbsp;&nbsp;
                  <span className="account-detail">{id}</span>
                </h3>
              </Col>
            </Row>
          </div>
          <Row>
            <Col md={12}>{this.renderContent()}</Col>
          </Row>
        </PageAbstract>
      </div>
    );
  }
}

CustomerDetailPage.propTypes = {
  match: PropTypes.object,
  getAccountDetail: PropTypes.func,
  accountDetail: PropTypes.object,
  errorMessage: PropTypes.string,
  modifyAccount: PropTypes.func,
  updateAccountStatus: PropTypes.func,
  selectAccountId: PropTypes.func,
  getAccountParent: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  accountDetail: makeAccountDetail() || {},
  errorMessage: makeErrorMessage() || '',
});

export default connect(
  mapStateToProps,
  {
    getAccountDetail,
    modifyAccount,
    updateAccountStatus,
    selectAccountId,
    getAccountParent,
  },
)(CustomerDetailPage);
