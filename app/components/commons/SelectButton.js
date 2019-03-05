import React from 'react';
import { ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class SelectButton extends React.Component {
  render() {
    const {
      title1,
      title2,
      onClickBtn1,
      onClickBtn2,
      activePosition,
    } = this.props;
    return (
      <ButtonGroup>
        <button
          type="button"
          className="btn"
          style={Object.assign(
            {},
            styles.styleBtn1,
            activePosition === 0 ? styles.active : styles.inactive,
          )}
          onClick={onClickBtn1}
        >
          {title1}
        </button>
        <button
          type="button"
          className="btn"
          style={Object.assign(
            {},
            styles.styleBtn2,
            activePosition === 1 ? styles.active : styles.inactive,
          )}
          onClick={onClickBtn2}
        >
          {title2}
        </button>
      </ButtonGroup>
    );
  }
}

SelectButton.propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
  onClickBtn1: PropTypes.func,
  onClickBtn2: PropTypes.func,
  activePosition: PropTypes.number,
};

const styles = {
  styleBtn1: {
    width: 135,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  styleBtn2: {
    width: 135,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  active: {
    backgroundColor: '#39b54a',
    color: 'white',
  },
  inactive: {
    backgroundColor: 'rgb(167, 167, 167)',
  },
};
