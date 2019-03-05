import React from 'react';
import PropTypes from 'prop-types';

class Sizing extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      size: props.size || 5,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.size !== nextProps.size) {
      this.setState({ size: nextProps.size });
    }
  }

  hanleClickPer = size => {
    this.setState({ size });
    this.props.handleSize(size);
  };

  renderButtonPerPage(size) {
    return (
      <button
        type="button"
        className={`btn btn-default ${this.state.size === size &&
          'btn-active'}`}
        onClick={() => this.hanleClickPer(size)}
      >
        {size}
      </button>
    );
  }

  render() {
    return (
      <div className="btn-group pull-right table__sizing" role="group">
        {this.renderButtonPerPage(5)}
        {this.renderButtonPerPage(10)}
        {this.renderButtonPerPage(15)}
        {this.renderButtonPerPage(20)}
      </div>
    );
  }
}

Sizing.propTypes = {
  size: PropTypes.number,
  handleSize: PropTypes.func,
};

export default Sizing;
