import React from 'react';
import PropTypes from 'prop-types';

import './TableHead.scss';

const TableHead = ({ children, headers }) => {
  return (
    <thead className="TableHead">
      {children && children}
      {headers && (
        <th>
          {headers.map(({ value, title }) => (
            <th key={value}>{title}</th>
          ))}
        </th>
      )}
    </thead>
  );
};

TableHead.propTypes = {
  children: PropTypes.node,
  headers: PropTypes.array,
};

TableHead.defaultProps = {
  children: null,
  headers: [],
};

export default TableHead;