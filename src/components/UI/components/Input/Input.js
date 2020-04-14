import React from 'react';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import './Input.scss';

const Input = (props) => {
  const id = uuidv4();

  return (
    <div className={classNames("Input", `Input--${props.type}`)}>
      <input
        id={id}
        {...props}
      />
      <label for={id} />
    </div>
  );
}

export default Input;