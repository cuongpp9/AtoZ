import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';
import Address from './Address';
import { ModalAddAddress } from '../../modals';

class Addresses extends React.PureComponent {
  constructor() {
    super();
    this.state = { isOpenModalAdd: false };
  }

  onToggleModalAdd = () => {
    this.setState(preState => ({ isOpenModalAdd: !preState.isOpenModalAdd }));
  };

  render() {
    const {
      addresses,
      modifyAccount,
      accountId,
      referenceParentAddress,
    } = this.props;
    const { isOpenModalAdd } = this.state;

    return (
      <div className="table-content">
        {addresses.map(address => (
          <Address
            key={address.id}
            address={address}
            modifyAccount={modifyAccount}
            accountId={accountId}
            disableModify={referenceParentAddress}
          />
        ))}
        {!referenceParentAddress && (
          <div className="row bottom-button-group">
            <Col md={12}>
              <Button color="success" onClick={() => this.onToggleModalAdd()}>
                Add New Address
              </Button>
            </Col>
          </div>
        )}
        <ModalAddAddress
          modalTitle="Add New Address"
          openModal={isOpenModalAdd}
          toggleModal={this.onToggleModalAdd}
        />
      </div>
    );
  }
}

Addresses.propTypes = {
  modifyAccount: PropTypes.func,
  addresses: PropTypes.array,
  accountId: PropTypes.string,
  referenceParentAddress: PropTypes.bool,
};

export default Addresses;
