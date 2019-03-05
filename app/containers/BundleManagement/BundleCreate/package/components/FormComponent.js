import React from 'react';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import ChildComponent from './ChildComponent';

export const renderSectionForm = ({
  fields,
  meta: { error, submitFailed },
  onSelectBundle,
  unSelectBundle,
}) => (
  <ul>
    {fields.map((component, id) => (
      <li key={component} className="m-t">
        <section>
          <div className="table-title table-title-form">
            <button
              type="button"
              title="Remove Price"
              className="form-section__icon-trash"
              onClick={() => fields.remove(id)}
            >
              <i className="fa fa-trash" />
            </button>
          </div>
          <ChildComponent
            component={component}
            onSelectBundle={onSelectBundle}
            unSelectBundle={unSelectBundle}
            idx={id}
          />
        </section>
      </li>
    ))}
    <li className="m-t">
      <button
        type="button"
        className="btn btn-success form-section__btn-add"
        onClick={() =>
          fields.push(
            fromJS({
              index: fields && fields.length ? `${fields.length + 1}` : '1',
            }),
          )
        }
      >
        Add New Component
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
);
renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
  onSelectBundle: PropTypes.func,
  unSelectBundle: PropTypes.func,
};
