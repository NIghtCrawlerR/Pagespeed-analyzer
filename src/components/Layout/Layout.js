import React from 'react';
import PropTypes from 'prop-types';

import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
 
export default Layout;