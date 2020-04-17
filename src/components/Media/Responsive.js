import React from 'react';
import PropTypes from 'prop-types';
import { Mobile, Desktop } from '.';

const Responsive = ({ children }) => (
  <>
    <Desktop>
      {children('desktop')}
    </Desktop>
    <Mobile>
      {children('mobile')}
    </Mobile>
  </>
);

Responsive.propTypes = {
  children: PropTypes.func,
};

Responsive.defaultProps = {
  children: () => {},
};

export default Desktop;