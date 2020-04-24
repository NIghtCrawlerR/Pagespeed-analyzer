import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import './Switcher.scss';

const Switcher = ({ onChange }) => (
  <div className="Switcher">
    <Input
      type="checkbox"
      name="switcher"
      onChange={onChange}
    />
  </div>
);

Switcher.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Switcher;