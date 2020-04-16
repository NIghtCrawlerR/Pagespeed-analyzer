import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import './Input.scss';

const Input = (props) => {
  const id = uuidv4();

  return (
    <div className={classNames("Input", `Input--${props.type}`, {
      'Input--error': props.error,
    })}
    >
      <input
        id={id}
        {...props}
      />
      <label htmlFor={id} />
    </div>
  );
}

export default Input;