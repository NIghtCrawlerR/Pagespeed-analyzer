import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import CircularProgress from '@material-ui/core/CircularProgress';

import { getColorStatus } from 'config';
import { ColorIndicator } from 'components/UI';

import './Summary.scss';

const SCORE_GUIDE = [{
  value: 0,
  label: 'Low',
}, {
  value: 0.5,
  label: 'Avarage',
}, {
  value: 1,
  label: 'High',
}]

class Summary extends Component {
  state = {
    showFull: false,
  };

  render() {
    const {
      summary: { performance },
      domain,
      date,
      loadTime,
      auditsCount,
    } = this.props;

    const getLoadTime = ms => {
      const sec = ms >= 1000 ? ms / 1000 : NaN;
      const time = parseFloat((sec || ms).toFixed(2));
      return sec ? `${time} s` : `${time} ms`;
    }

    const colorStatus = getColorStatus(performance.score * 100);

    return (
      <div className="Summary">
        <div className="Summary__speed-score-wrap">
          <div className="Summary__speed-score">
            <CircularProgress
              variant="static"
              value={performance.score * 100}
              size={170}
              thickness={3}
              color="inherit"
              className={classNames("Summary__speed-score-progress", `Summary__speed-score-progress--${colorStatus}`)}
            />
            <div className={classNames(
              "Summary__speed-score-value",
              `color--${colorStatus}`,
            )}>
              {Math.floor(performance.score * 100)} %
            </div>
          </div>
          <div className="Summary__speed-score-legend">
            {SCORE_GUIDE.map(({ value, label }, i) => (
              <p key={i} className="Summary__score-guide-item">
                <ColorIndicator score={value} /> - {label}
              </p>
            ))}
          </div>
        </div>

        <div className="Summary__info">
          <a className="Summary__domain" href={domain} target="_blank">{domain}</a>
          <p className="Summary__report-date">{moment(date).format('DD.MM.YYYY HH:mm')}</p>
        </div>

        <div className="Summary__performance">
          <div className="Summary__performance-item">
            <div className="Summary__performance-item-header">
              <div className="Summary__performance-item-header-col">
                Load time
              </div>
            </div>
            <div className="Summary__performance-item-body">
              <div className="Summary__performance-item-body-col">
                {getLoadTime(loadTime)}
              </div>
            </div>
          </div>
          <div className="Summary__performance-item">
            <div className="Summary__performance-item-header">
              <div className="Summary__performance-item-header-col">
                Errors
              </div>
              <div className="Summary__performance-item-header-col">
                Passed
              </div>
            </div>
            <div className="Summary__performance-item-body">
              <div className="Summary__performance-item-body-col">
                {auditsCount.errors}
              </div>
              <div className="Summary__performance-item-body-col">
                {auditsCount.passed}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;