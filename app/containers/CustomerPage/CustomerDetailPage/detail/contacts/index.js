import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button } from 'reactstrap';
import Contact from './Contact';
import { ModalAddContact } from '../../modals';

class Contacts extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isOpenModalAdd: false,
    };
  }

  onToggleModalAdd = () => {
    this.setState(preState => ({ isOpenModalAdd: !preState.isOpenModalAdd }));
  };

  render() {
    const {
      contacts,
      modifyAccount,
      accountId,
      referenceParentContact,
    } = this.props;
    const { isOpenModalAdd } = this.state;
    return (
      <div className="table-content">
        {contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            modifyAccount={modifyAccount}
            accountId={accountId}
            disableModify={referenceParentContact}
          />
        ))}
        {!referenceParentContact && (
          <div className="row bottom-button-group">
            <Col md={12}>
              <Button color="success" onClick={() => this.onToggleModalAdd()}>
                Add New Contact
              </Button>
            </Col>
          </div>
        )}
        <ModalAddContact
          modalTitle="Add New Contact"
          openModal={isOpenModalAdd}
          toggleModal={this.onToggleModalAdd}
        />
      </div>
    );
  }
}

Contacts.propTypes = {
  contacts: PropTypes.array,
  accountId: PropTypes.string,
  referenceParentContact: PropTypes.bool,
  modifyAccount: PropTypes.func,
};

export default Contacts;
