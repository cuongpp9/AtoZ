import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.PureComponent {
  componentDidMount() {}

  render() {
    const { isActivePre, isActiveNext, handlePage } = this.props;
    return (
      <div
        className="btn-group table__pagination"
        role="group"
        aria-label="Basic example"
      >
        <button
          type="button"
          className="btn btn-default btn-previous"
          disabled={!isActivePre}
          onClick={() => handlePage(-1)}
        >
          <span aria-hidden="true">
            {' '}
            <i className="fa fa-caret-left" /> Older
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          className="btn btn-default btn-next"
          disabled={!isActiveNext}
          onClick={() => handlePage(1)}
        >
          <span aria-hidden="true">
            Newer
            <i className="fa fa-caret-right" />
          </span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  isActivePre: PropTypes.bool,
  isActiveNext: PropTypes.bool,
  handlePage: PropTypes.func,
};

export default Pagination;
