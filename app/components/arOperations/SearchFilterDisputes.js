import React from 'react';
import { Col, ButtonToolbar } from 'reactstrap';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form/immutable';
import CalendarBlankIcon from 'mdi-react/CalendarBlankIcon';
import { arOpsSelect } from 'constantsApp';
import { selectItemsId } from 'containers/App/actions';
import { calculateValCallback } from 'utils/utils';
import { ModalSelectItem } from 'components/modals';
import { RenderSelectField, RenderField, RenderDatePickerField } from '../form';
import { ButtonCustom } from '../commons';
class SearchFilter extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      openModalI: false,
      pageI: 1,
      sizeI: 20,
      isSearchingI: false,
      itemId: '',
      items: [],
    };
  }

  componentDidMount() {
    this.props.selectItemsId({ page: 1, size: 20 }, data => {
      const items = calculateValCallback(data);
      this.setState({ items });
    });
  }

  onToggleModalI = () => {
    this.setState(preState => ({ openModalI: !preState.openModalI }));
  };

  onSelectItem = itemId => {
    this.setState({ itemId });
  };

  unSelectItem = () => {
    this.setState({ openModalI: false, itemId: '' });
  };

  handlePageI = pageOffset => {
    const { pageI, sizeI } = this.state;

    this.setState({ pageI: pageI + pageOffset });
    this.props.selectItemsId(
      {
        page: pageI + pageOffset,
        size: sizeI,
        filter: this.filterI,
      },
      data => {
        const items = calculateValCallback(data);
        this.setState({ items });
      },
    );
  };

  handleSizeI = sizeI => {
    this.setState({ sizeI, pageI: 1 });
    this.props.selectItemsId(
      {
        page: 1,
        size: sizeI,
        filter: this.filterI,
      },
      data => {
        const items = calculateValCallback(data);
        this.setState({ items });
      },
    );
  };

  onHandleSearchI = filter => {
    this.setState({ isSearchingI: true });
    this.props.selectItemsId(
      {
        page: 1,
        size: 20,
        filter,
      },
      data => {
        const items = calculateValCallback(data);
        this.setState({
          isSearchingI: false,
          pageI: 1,
          sizeI: 20,
          items,
        });
      },
    );
    this.filterI = filter;
  };

  onHandleSearch = values => {
    const { itemId } = this.state;
    const result = values.toJS();
    const {
      accountId,
      userId,
      type,
      reason,
      source,
      startDate,
      taxRule,
      status,
    } = result;
    const filter = {
      accountId: accountId || null,
      userId: userId || null,
      itemId: itemId || null,
      type: type ? type.value : null,
      reason: reason ? reason.value : null,
      source: source ? source.value : null,
      taxRule: taxRule ? taxRule.value : null,
      status: status ? status.value : null,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
    };
    this.props.onHandleSearch(filter);
  };

  render() {
    const { handleSubmit, isSearching, statusOptions } = this.props;
    const {
      items,
      itemId,
      pageI,
      sizeI,
      openModalI,
      isSearchingI,
    } = this.state;
    return (
      <div className="search-filter">
        <Col md={12} lg={12} xl={12}>
          <form className="form" onSubmit={handleSubmit(this.onHandleSearch)}>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="startDate"
                  component={RenderDatePickerField}
                  placeholder="Start Date"
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon />
                </div>
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="userId"
                  component={RenderField}
                  placeholder="User Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <input
                  name="itemId"
                  value={itemId}
                  placeholder="Item Id"
                  onChange={() => {}}
                  onClick={this.onToggleModalI}
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="accountId"
                  component={RenderField}
                  placeholder="Account Id"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="source"
                  component={RenderSelectField}
                  options={arOpsSelect.source}
                  placeholder="Source"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="reason"
                  component={RenderSelectField}
                  options={arOpsSelect.reason}
                  placeholder="reason"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="type"
                  component={RenderSelectField}
                  options={arOpsSelect.type}
                  placeholder="AR Type"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="taxRule"
                  component={RenderSelectField}
                  options={arOpsSelect.taxRule}
                  type="text"
                  placeholder="Tax Rule"
                />
              </div>
            </div>
            <div className="form__form-group">
              <div className="form__form-group-field">
                <Field
                  name="status"
                  component={RenderSelectField}
                  options={statusOptions}
                  placeholder="Status"
                />
              </div>
            </div>
            <ButtonToolbar className="form__button-toolbar">
              <ButtonCustom
                loading={isSearching}
                className="btn btn-primary"
                type="submit"
                title="Search"
                titleloading="Searching"
              />
            </ButtonToolbar>
          </form>
        </Col>
        <ModalSelectItem
          openModal={openModalI}
          toggleModal={this.onToggleModalI}
          items={items}
          onSelectItem={this.onSelectItem}
          idSelected={itemId}
          unSelectItem={this.unSelectItem}
          page={pageI}
          size={sizeI}
          isSearching={isSearchingI}
          handlePage={this.handlePageI}
          handleSize={this.handleSizeI}
          onHandleSearch={this.onHandleSearchI}
          modalTitle="Choose item"
        />
      </div>
    );
  }
}

SearchFilter.propTypes = {
  handleSubmit: PropTypes.func,
  onHandleSearch: PropTypes.func,
  isSearching: PropTypes.bool,
  selectItemsId: PropTypes.func,
  statusOptions: PropTypes.array,
};

const withConnect = connect(
  null,
  {
    selectItemsId,
  },
);

const withReduxForm = reduxForm({
  form: 'searchFilterDisputes', // a unique identifier for this form
});

export default compose(
  withConnect,
  withReduxForm,
)(SearchFilter);
