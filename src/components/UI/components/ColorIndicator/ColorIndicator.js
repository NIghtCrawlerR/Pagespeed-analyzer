import React from 'react';
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

  return (
    <div className={classNames("ColorIndicator", {
      'ColorIndicator--high': getColorStatus(totalScore) === HIGH,
      'ColorIndicator--mid': getColorStatus(totalScore) === MID,
      'ColorIndicator--low': getColorStatus(totalScore) === LOW,
    })}></div>
  );
}
 
export default ColorIndicator;
