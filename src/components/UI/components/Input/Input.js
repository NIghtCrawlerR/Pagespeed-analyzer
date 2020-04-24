import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import './Input.scss';

const Input = (props) => {
  const {
    error,
    type,
    className,
    ...rest
  } = props;

  const id = uuidv4();

  return (
    <div className={classNames('Input', `Input--${type}`, className, {
      'Input--error': error,
    })}
    >
      <input
        id={id}
        type={type}
        {...rest}
      />
      <label htmlFor={id} />
    </div>
  );
};

Input.propTypes = {
  error: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  error: false,
  type: 'text',
  className: null,
};

export default Input;