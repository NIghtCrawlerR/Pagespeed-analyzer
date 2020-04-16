import React from 'react';
import './Table.scss';

const Table = ({ children }) => {
  return (
    <table className="Table">
      {children}
    </table>
  );
}

export default Table;