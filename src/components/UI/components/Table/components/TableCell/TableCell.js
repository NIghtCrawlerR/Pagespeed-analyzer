import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = (props) => {
  const { children } = props;

  return (
    <td
      {...props}
      className={classNames('TableCell', props.className)}
    >
      {children}
    </td>
  );
};


TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableCell.defaultProps = {
  children: null,
  className: '',
};

export default TableCell;