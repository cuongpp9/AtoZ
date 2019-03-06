import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Button } from 'reactstrap';
import { FormGroup, FormPanel } from '../../../../components/form';

const heads = [
  {
    key: 'Type',
    name: 'Type',
  },

  {
    key: 'Number',
    name: 'Number',
  },
];

export class UserDetailsContact extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  renderRow = row => (
    <tr key={row.type}>
      <td>{row.type}</td>
      <td>{row.number}</td>
    </tr>
  );

  renderHeader = header => (
    <th key={header.key} scope="col" className="w-25 p-3">
      {header.name}
    </th>
  );

  renderBodyPhones = ({ data = [] }) => {
    if (!data || (data && !data.length)) {
      return (
        <tbody>
          <tr>
            <td colSpan={12}>No record has found!</td>
          </tr>
        </tbody>
      );
    }

    return <tbody>{data.map(this.renderRow)}</tbody>;
  };

  onChangeValueForm = (fieldName, value) => {
    const {
      data: { contact = [] },
    } = this.props;
    contact[0][fieldName] = value;
    this.props.onChangeValueForm(fieldName, contact);
  };

  renderSectionForm(data) {
    const {
      salutation = '',
      firstName = '',
      lastName = '',
      middleName = '',
      organization = '',
      position = '',
      email = '',
      phones = [],
    } = data;
    return (
      <form
        className="form form--horizontal form-detail-user-contact"
        onSubmit={() => {}}
      >
        <div className="user-contact-left">
          <FormGroup title="Salutation" className="font-weight-bold">
            <input
              name="salutation"
              type="text"
              placeholder="Salutation"
              value={salutation || ''}
              onChange={evt =>
                this.onChangeValueForm('salutation', evt.target.value)
              }
            />
          </FormGroup>
          <FormGroup title="First Name" className="font-weight-bold">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={firstName || ''}
              onChange={evt =>
                this.onChangeValueForm('firstName', evt.target.value)
              }
            />
          </FormGroup>
          <FormGroup title="Middle Name" className="font-weight-bold">
            <input
              name="middleName"
              type="text"
              placeholder="Middle Name"
              value={middleName || ''}
              onChange={evt =>
                this.onChangeValueForm('middleName', evt.target.value)
              }
            />
          </FormGroup>
          <FormGroup title="Last Name" className="font-weight-bold">
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName || ''}
              onChange={evt =>
                this.onChangeValueForm('lastName', evt.target.value)
              }
            />
          </FormGroup>
          <FormGroup title="Position" className="font-weight-bold">
            <input
              name="position"
              type="text"
              placeholder="Position"
              value={position || ''}
              onChange={evt =>
                this.onChangeValueForm('position', evt.target.value)
              }
            />
          </FormGroup>
          <FormGroup title="Organization" className="font-weight-bold">
            <input
              name="organization"
              type="text"
              placeholder="Organization"
              value={organization || ''}
              onChange={evt =>
                this.onChangeValueForm('organization', evt.target.value)
              }
            />
          </FormGroup>
          <FormGroup title="Email" className="font-weight-bold">
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email || ''}
              onChange={evt =>
                this.onChangeValueForm('email', evt.target.value)
              }
            />
          </FormGroup>
        </div>
        <div className="user-contact-right">
          <FormPanel title="Phones" className="form-panel-user">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>{heads.map(item => this.renderHeader(item))}</tr>
                {/* {this.props.renderBodyFormUserDetail({ data: phones })} */}
              </thead>
              {this.renderBodyPhones({ data: phones })}
            </table>
          </FormPanel>
          <div className="group-btn-phone">
            <Button className="btn_delete_phone" color="success">
              Delete
            </Button>
            <Button className="btn_add_phone" color="success">
              + Add New
            </Button>
          </div>
        </div>
      </form>
    );
  }
  render() {
    const {
      data: { contact = [] },
    } = this.props;
    return map(contact, (data, key) => (
      <div key={key} className="form-section">
        {this.renderSectionForm(data)}
      </div>
    ));
  }
}

UserDetailsContact.propTypes = {
  data: PropTypes.object,
  onChangeValueForm: PropTypes.func,
};

export default UserDetailsContact;
