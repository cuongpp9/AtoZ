import React from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import className from 'classnames';
import { getAccountDetail } from 'api';
class AccountRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      needFetch: true,
      parentAccount: {},
    };
  }

  async getParentAccount(client) {
    const { account } = this.props;
    if (
      account.parentId &&
      (!account.contacts.length || !account.addresses.length)
    ) {
      const { data } = await client.query({
        query: getAccountDetail(account.parentId),
      });
      if (data && data.getAccountById) {
        this.setState({
          parentAccount: data.getAccountById,
          needFetch: false,
        });
      }
    }
  }

  contactContent(acct) {
    if (!acct || !acct.contacts || !acct.contacts.length) return {};
    const contactBilling = acct.contacts.find(el =>
      el.roles.some(role => role === 'BILLING'),
    );

    if (contactBilling) return contactBilling;
    return acct.contacts[0];
  }

  addressContent(acct) {
    if (!acct || !acct.addresses || !acct.addresses.length) return {};
    const addressBilling = acct.addresses.find(el =>
      el.roles.some(role => role === 'BILLING'),
    );

    if (addressBilling) return addressBilling;
    return acct.addresses[0];
  }

  render() {
    const { account = {}, onSelect, itemSelected } = this.props;
    const { needFetch, parentAccount = {} } = this.state;
    const contentCt =
      account.parentId && !account.contacts.length
        ? this.contactContent(parentAccount)
        : this.contactContent(account);
    const contentAdd =
      account.parentId && !account.addresses.length
        ? this.addressContent(parentAccount)
        : this.addressContent(account);
    return (
      <ApolloConsumer>
        {client => {
          if (needFetch) {
            this.getParentAccount(client);
          }
          return (
            <tr
              onClick={() => onSelect(account.id)}
              className={className({
                'column-active': itemSelected === account.id,
              })}
            >
              <td>{account.id}</td>
              <td>{contentCt.firstName}</td>
              <td>{contentCt.lastName}</td>
              <td>{contentCt.organization}</td>
              <td>{contentCt.email}</td>
              <td>{contentAdd.city}</td>
              <td>{contentAdd.state}</td>
              <td>{account.currency}</td>
              <td>{account.status}</td>
              <td>{account.reason}</td>
            </tr>
          );
        }}
      </ApolloConsumer>
    );
  }
}

AccountRow.propTypes = {
  account: PropTypes.object,
  onSelect: PropTypes.func,
  itemSelected: PropTypes.object,
};

export default AccountRow;
