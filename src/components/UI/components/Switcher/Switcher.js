import React from 'react';

import Input from '../Input';
import './Switcher.scss';

const Switcher = ({ onChange }) => {
  return (
    <div className="Switcher">
      <Input
        type="checkbox"
        name="switcher"
        onChange={onChange}
      />
    </div>
  );
}

export default Switcher;