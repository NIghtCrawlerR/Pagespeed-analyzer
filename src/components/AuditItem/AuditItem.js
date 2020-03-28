import React, { Component } from 'react';
import classNames from 'classnames';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import AuditItemInfo from '../AuditItemInfo';

const HIGH = 'HIGH';
const MID = 'MID';
const LOW = 'LOW';

class AuditItem extends Component {
  getColorStatus = score => {
    switch (true) {
      case score > 90:
        return HIGH;
      case score >= 50 && score <= 90:
        return MID;
      case score < 50:
        return LOW;
      default:
        return null;
    }
  }

  render() {
    const { audit } = this.props;
    const { details: { items } } = audit;

    return (
      <>
        <TableRow key={audit.id}>
          <TableCell align="left">
            <div className={classNames("AuditGroup__color-indicator", {
              'AuditGroup__color-indicator--high': this.getColorStatus(audit.score * 100) === HIGH,
              'AuditGroup__color-indicator--mid': this.getColorStatus(audit.score * 100) === MID,
              'AuditGroup__color-indicator--low': this.getColorStatus(audit.score * 100) === LOW,
            })}></div>
          </TableCell>
          <TableCell align="left">{audit.title}</TableCell>
          <TableCell align="right">
            {audit.displayValue && (
              <Tooltip title={audit.displayValue} placement="top">
                <span>
                  {audit.scoreDisplayMode === 'numeric' && audit.numericValue
                    ? `${audit.numericValue / 100} s` : null}
                </span>
              </Tooltip>
            )}

          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3}>
            {audit.description}

            {items && items.length && <AuditItemInfo items={items} />}
          </TableCell>
        </TableRow>
      </>
    );
  }
}

export default AuditItem;