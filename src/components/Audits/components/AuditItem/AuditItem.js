import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';

import { getColorStatus, COLOR_CODES } from 'config';
import {
  ColorIndicator,
  TextWithLink,
  TableRow,
  TableCell,
} from 'components/UI';
import AuditItemInfo from '../AuditItemInfo';

import './AuditItem.scss';

class AuditItem extends Component {
  static propTypes = {
    audit: PropTypes.shape({
      score: PropTypes.number,
      title: PropTypes.string,
      id: PropTypes.string,
      scoreDisplayMode: PropTypes.string,
      displayValue: PropTypes.string,
      description: PropTypes.string,
      numericValue: PropTypes.number,
      details: PropTypes.object,
    }).isRequired,
    progressbar: PropTypes.bool,
  };

  static defaultProps = {
    progressbar: false,
    details: null,
  };

  state = {
    showInfo: false,
  };

  toggleInfo = () => {
    this.setState({
      showInfo: !this.state.showInfo,
    });
  };

  render() {
    const { showInfo } = this.state;
    const { audit, progressbar } = this.props;
    const { details } = audit;

    return (
      <>
        <TableRow
          key={audit.id}
          className="AuditItem"
          onClick={this.toggleInfo}
        >
          <TableCell width="5%" align="center">
            <ColorIndicator score={audit.score} />
          </TableCell>
          <TableCell>
            <div className="AuditItem__title">{audit.title}</div>
          </TableCell>
          <TableCell>
            <div className="AuditItem__score">
              {audit.scoreDisplayMode === 'numeric' && progressbar && (
                <>
                  <div className="AuditItem__progress-bar-wrap">
                    <Line
                      percent={audit.score * 100}
                      strokeWidth="4"
                      trailWidth="4"
                      strokeColor={COLOR_CODES[getColorStatus(audit.score * 100)]}
                      trailColor="#D3D3D3"
                    />
                  </div>
                  <span className={`AuditItem__score-value color--${getColorStatus(audit.score * 100)}`}>
                    {audit.scoreDisplayMode === 'numeric' && audit.numericValue
                      ? `${audit.numericValue / 100} s` : null}
                  </span>
                </>
              )}

              {audit.scoreDisplayMode === 'numeric' && !progressbar && audit.displayValue}

              {audit.scoreDisplayMode === 'informative' && audit.displayValue}
            </div>
          </TableCell>
        </TableRow>
        {showInfo && (
          <TableRow>
            <TableCell colSpan={3}>
              <>
                <TextWithLink text={audit.description} />

                {details && <AuditItemInfo details={details} />}
              </>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }
}

export default AuditItem;