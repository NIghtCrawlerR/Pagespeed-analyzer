import React from 'react';
import classNames from 'classnames';

import './TableRow.scss';

const TableRow = (props) => {
  const { children } = props;

  return (
    <tr
      {...props}
      className={classNames("TableRow", props.className)}
    >
      {children}
    </tr>
  );
}

export default TableRow;