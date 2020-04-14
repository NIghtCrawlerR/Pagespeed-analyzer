import React, { Component } from 'react';
import classNames from 'classnames';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getColorStatus } from 'config';
import { ColorIndicator, TextWithLink } from 'components/UI';
import AuditItemInfo from '../AuditItemInfo';

import './AuditItem.scss';

class AuditItem extends Component {
  state = {
    showInfo: false,
  };

  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo,
    })
  };

  render() {
    const { showInfo } = this.state;
    const { audit, progressbar } = this.props;
    const { details } = audit;

    return (
      <>
        <TableRow key={audit.id} className="AuditItem" onClick={this.toggleInfo}>
          <TableCell align="left">
            <ColorIndicator score={audit.score} />
          </TableCell>
          <TableCell align="left">
            <div className="AuditItem__title">{audit.title}</div>
          </TableCell>
          <TableCell align="right">
            <div className="AuditItem__score">
              {audit.score && progressbar && (
                <LinearProgress
                  variant="determinate"
                  value={audit.score * 100}
                  color="primary"
                  className={classNames("AuditItem__progress", `ProgressCustom--${getColorStatus(audit.score * 100)}`)}
                />
              )}

              {audit.displayValue && (
                <Tooltip title={audit.displayValue} placement="top">
                  <span className={`AuditItem__score-value color--${getColorStatus(audit.score * 100)}`}>
                    {audit.scoreDisplayMode === 'numeric' && audit.numericValue
                      ? `${audit.numericValue / 100} s` : null}
                  </span>
                </Tooltip>
              )}
            </div>
          </TableCell>
        </TableRow>
        {showInfo && (
          <TableRow>
            <TableCell colSpan={3}>
              <TextWithLink text={audit.description} />

              {details && <AuditItemInfo details={details} />}
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }
}

export default AuditItem;