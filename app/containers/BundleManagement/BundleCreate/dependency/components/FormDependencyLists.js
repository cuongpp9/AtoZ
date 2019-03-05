import React from 'react';
import { Field } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';
import { FormGroup, RenderField, RenderSelectField } from 'components/form';
import { dataSelect } from 'constantsApp';
import ChildComponent from './ChildComponent';

export const renderSectionForm = ({
  fields,
  meta: { error, submitFailed },
  onSelectBundleLst,
  unSelectBundleLst,
  onSelectPackageLst,
  unSelectPackageLst,
  bundles,
  packages,
}) => (
  <section className="section-form-child">
    <div className="table-title table-title-form">
      <h5 className="bold-text">Dependency List</h5>
    </div>
    <div className="form-content">
      <ul>
        {fields.map((dependency, id) => (
          <li key={dependency} className="m-t">
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
                dependency={dependency}
                onSelectBundleLst={onSelectBundleLst}
                unSelectBundleLst={unSelectBundleLst}
                onSelectPackageLst={onSelectPackageLst}
                unSelectPackageLst={unSelectPackageLst}
                bundles={bundles}
                packages={packages}
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
            Add New Dependency List
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
      </ul>
    </div>
  </section>
);
renderSectionForm.propTypes = {
  fields: PropTypes.any,
  meta: PropTypes.object,
  bundles: PropTypes.array,
  packages: PropTypes.array,
  onSelectBundleLst: PropTypes.func,
  unSelectBundleLst: PropTypes.func,
  onSelectPackageLst: PropTypes.func,
  unSelectPackageLst: PropTypes.func,
};
