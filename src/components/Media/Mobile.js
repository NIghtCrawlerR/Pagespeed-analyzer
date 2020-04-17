import React from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';

const Mobile = ({ children }) => (
  <Responsive maxWidth={768}>
    {children}
  </Responsive>
);

Mobile.propTypes = {
  children: PropTypes.node,
};

Mobile.defaultProps = {
  children: null,
};

export default Mobile;