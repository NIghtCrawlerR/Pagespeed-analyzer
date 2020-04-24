import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableRow.scss';

const TableRow = (props) => {
  const { children } = props;

  return (
    <tr
      {...props}
      className={classNames('TableRow', props.className)}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableRow.defaultProps = {
  children: null,
  className: '',
};

export default TableRow;