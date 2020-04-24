import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const Button = (props) => {
  const {
    children,
    textButton,
    className,
    color,
    ...rest
  } = props;

  const buttonProps = {
    ...rest,
  };

  return (
    <button
      {...buttonProps}
      type="button"
      className={classNames('Button', className, {
        'Button--solid': !textButton,
        'Button--text': textButton,
        [`Button--${color}`]: color,
        'Button--blue': !color,
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  textButton: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  children: null,
  textButton: false,
  className: '',
  color: '',
};

export default Button;