import React from 'react';

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
}

export default TableHead;