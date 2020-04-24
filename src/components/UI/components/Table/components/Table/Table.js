import React from 'react';
import PropTypes from 'prop-types';

import './Table.scss';

const Table = ({ children }) => (
  <table className="Table">
    {children}
  </table>
);

Table.propTypes = {
  children: PropTypes.node,
};

Table.defaultProps = {
  children: null,
};

export default Table;