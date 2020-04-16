import React from 'react';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = (props) => {
  const { children } = props;

  return (
    <td
      {...props}
      className={classNames("TableCell", props.className)}
    >
      {children}
    </td>
  );
}
 
export default TableCell;