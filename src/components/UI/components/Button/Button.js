import React from 'react';
import classNames from 'classnames';

import './Button.scss';

const Button = (props) => {
  const { onClick, children, textbutton, className, color } = props;

  return (
    <button
      {...props}
      type="button"
      className={classNames("Button", className, {
        "Button--solid": !textbutton,
        "Button--text": textbutton,
        [`Button--${color}`]: color,
        "Button--blue": !color,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
 
export default Button;