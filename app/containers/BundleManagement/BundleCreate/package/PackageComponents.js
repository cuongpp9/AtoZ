import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form/immutable';
import { FormPanel } from 'components/form';
import { renderSectionForm } from './components/FormComponent';
class PackageComponents extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { className, onSelectBundle, unSelectBundle } = this.props;
    return (
      <FormPanel title="Components" className={className}>
        <div className="form-section">
          <FieldArray
            name="components"
            component={renderSectionForm}
            onSelectBundle={onSelectBundle}
            unSelectBundle={unSelectBundle}
          />
        </div>
      </FormPanel>
    );
  }
}

PackageComponents.propTypes = {
  className: PropTypes.string,
  onSelectBundle: PropTypes.func,
  unSelectBundle: PropTypes.func,
};

export default PackageComponents;
