import React, { PureComponent } from 'react';
import { FieldArray } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import FormBillingProfile from './components/FormBillingProfile';

const renderSectionForm = ({
  fields,
  meta: { error, submitFailed },
  isNonPaying,
}) => (
  <ul>
    {fields.map((billing, id) => (
      <li key={billing}>
        <section>
          <div className="table-title table-title-form">
            <h3 className="bold-text">Billing Info</h3>
            {fields.length > 1 &&
              !isNonPaying && (
                <button
                  type="button"
                  title="Remove Billing"
                  className="form-section__icon-trash"
                  onClick={() => fields.remove(id)}
                >
                  <i className="fa fa-trash" />
                </button>
              )}
          </div>
          <FormBillingProfile billing={billing} isNonPaying={isNonPaying} />
        </section>
      </li>
    ))}
    {!isNonPaying && (
      <li>
        <button
          type="button"
          className="btn btn-success form-section__btn-add"
          onClick={() => fields.push(fromJS({}))}
          disabled
        >
          Add New Billing
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
    )}
  </ul>
);

renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
  isNonPaying: PropTypes.bool,
};

class CreateInfoBillingProfiles extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { isNonPaying } = this.props;
    return (
      <div className="form-section">
        <FieldArray
          name="billingProfiles"
          component={renderSectionForm}
          isNonPaying={isNonPaying}
        />
      </div>
    );
  }
}

CreateInfoBillingProfiles.propTypes = {
  isNonPaying: PropTypes.bool,
};

export default CreateInfoBillingProfiles;
