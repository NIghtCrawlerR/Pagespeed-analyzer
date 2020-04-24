import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ children }) => (
  <tbody className="TableBody">
    {children}
  </tbody>
);

TableBody.propTypes = {
  children: PropTypes.node,
};

TableBody.defaultProps = {
  children: null,
};
 
export default TableBody;