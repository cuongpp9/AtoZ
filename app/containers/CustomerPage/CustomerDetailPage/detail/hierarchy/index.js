import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row } from 'reactstrap';
import { Pagination, Sizing } from 'components/commons';

const headers = [
  'Acct No',
  'First Name',
  'Last Name',
  'Organization',
  'Email',
  'City',
  'State',
  'Currency',
  'Status',
  'Reason',
];
class Hierarchy extends Component {
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

  renderHeaderTable() {
    return (
      <thead>
        <tr>{headers.map(item => <th key={item}>{item}</th>)}</tr>
      </thead>
    );
  }

  renderRowChild = acct => {
    const { account } = this.props;
    const contactC = acct.contacts.length
      ? this.contactContent(acct)
      : this.contactContent(account);
    const addresseC = acct.addresses.length
      ? this.addressContent(acct)
      : this.addressContent(account);
    return (
      <tr key={acct.id}>
        <td>{acct.id}</td>
        <td>{contactC.firstName}</td>
        <td>{contactC.lastName}</td>
        <td>{contactC.organization}</td>
        <td>{contactC.email}</td>
        <td>{addresseC.city}</td>
        <td>
          {addresseC.state}, {addresseC.country}
        </td>
        <td>{acct.currency}</td>
        <td>{acct.status}</td>
        <td>{acct.reason}</td>
      </tr>
    );
  };

  renderContent() {
    const { parentAccount = {}, childrenAcct } = this.props;
    if (parentAccount.id) {
      const contactP = this.contactContent(parentAccount);
      const addresseP = this.addressContent(parentAccount);
      return (
        <tbody>
          <tr>
            <td>{parentAccount.id}</td>
            <td>{contactP.firstName}</td>
            <td>{contactP.lastName}</td>
            <td>{contactP.organization}</td>
            <td>{contactP.email}</td>
            <td>{addresseP.city}</td>
            <td>
              {addresseP.state}, {addresseP.country}
            </td>
            <td>{parentAccount.currency}</td>
            <td>{parentAccount.status}</td>
            <td>{parentAccount.reason}</td>
          </tr>
        </tbody>
      );
    }

    if (childrenAcct.length) {
      return <tbody>{childrenAcct.map(this.renderRowChild)}</tbody>;
    }
    return (
      <tbody>
        <tr>
          <td>No children records</td>
        </tr>
      </tbody>
    );
  }

  render() {
    const {
      childrenAcct,
      handlePageChildren,
      handleSizeChildren,
      pageChildren,
      sizeChildren,
    } = this.props;
    const isActiveNext = !(childrenAcct.length < sizeChildren);
    return (
      <Card>
        <div className="table-block">
          <CardBody>
            <table className="table table-hover">
              {this.renderHeaderTable()}
              {this.renderContent()}
            </table>
            {childrenAcct.length ? (
              <div className="table__action ml-3 mr-3">
                <Row>
                  <Col md={6}>
                    <Pagination
                      page={pageChildren}
                      isActivePre={pageChildren !== 1}
                      isActiveNext={isActiveNext}
                      handlePage={handlePageChildren}
                    />
                  </Col>
                  <Col md={6}>
                    <Sizing
                      handleSize={handleSizeChildren}
                      size={sizeChildren}
                    />
                  </Col>
                </Row>
              </div>
            ) : null}
          </CardBody>
        </div>
      </Card>
    );
  }
}

Hierarchy.propTypes = {
  account: PropTypes.object,
  parentAccount: PropTypes.object,
  childrenAcct: PropTypes.array,
  handlePageChildren: PropTypes.func,
  handleSizeChildren: PropTypes.func,
  pageChildren: PropTypes.number,
  sizeChildren: PropTypes.number,
};

export default Hierarchy;
