import React from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';

const Desktop = ({ children }) => (
  <Responsive minWidth={769}>
    {children}
  </Responsive>
);

Desktop.propTypes = {
  children: PropTypes.node,
};

Desktop.defaultProps = {
  children: null,
};

export default Desktop;