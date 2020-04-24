import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  HIGH,
  MID,
  LOW,
  getColorStatus,
} from 'config';

import './ColorIndicator.scss';

const ColorIndicator = ({ score }) => {
  const totalScore = score * 100;
  const colorStatus = getColorStatus(totalScore);

  return (
    <span className={classNames('ColorIndicator', {
      'ColorIndicator--high': colorStatus === HIGH,
      'ColorIndicator--mid': colorStatus === MID,
      'ColorIndicator--low': colorStatus === LOW,
    })}
    ></span>
  );
};

ColorIndicator.propTypes = {
  score: PropTypes.number,
};

ColorIndicator.defaultProps = {
  score: null,
};

export default ColorIndicator;
