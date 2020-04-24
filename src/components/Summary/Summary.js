import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { Circle } from 'rc-progress';

import { getColorStatus, COLOR_CODES } from 'config';
import { ColorIndicator } from 'components/UI';
import { ReactComponent as TickIcon } from 'assets/img/tick.svg';
import { ReactComponent as ErrorIcon } from 'assets/img/error.svg';
import { ReactComponent as TimeIcon } from 'assets/img/time.svg';

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
}];

class Summary extends Component {
  static propTypes = {
    performance: PropTypes.object,
    domain: PropTypes.string,
    date: PropTypes.string,
    loadTime: PropTypes.number,
    auditsCount: PropTypes.shape({
      errors: PropTypes.number,
      passed: PropTypes.number,
    }),
    collapsed: PropTypes.bool,
  };

  static defaultProps = {
    performance: {},
    domain: '',
    date: '',
    loadTime: 0,
    auditsCount: null,
    collapsed: false,
  };

  render() {
    const {
      performance,
      domain,
      date,
      loadTime,
      auditsCount,
      collapsed,
    } = this.props;

    const getLoadTime = ms => {
      if (!ms) return null;

      const sec = ms >= 1000 ? ms / 1000 : NaN;
      const time = parseFloat((sec || ms).toFixed(2));
      return sec ? `${time} s` : `${time} ms`;
    };

    const score = get(performance, 'score', NaN) * 100;
    const colorStatus = getColorStatus(score);

    return (
      <div className="Summary">
        <div className={classNames('Summary__speed-score-wrap', {
          collapsed,
        })}
        >
          <div className="Summary__speed-score">
            {!collapsed && (
              <Circle
                percent={score}
                strokeWidth="6"
                trailWidth="6"
                strokeColor={COLOR_CODES[getColorStatus(score)] || '#e5e7e8'}
              />
            )}

            <div className={classNames('Summary__speed-score-value', {
              [`color--${colorStatus}`]: colorStatus,
              collapsed: collapsed,
            }
            )}
            >
              {score ? `${Math.floor(score)} %` : '0 %'}
            </div>
          </div>
          {!collapsed && (
            <div className="Summary__speed-score-legend">
              {SCORE_GUIDE.map(({ value, label }, i) => (
                <p key={i} className="Summary__score-guide-item">
                  <ColorIndicator score={value} /> - {label}
                </p>
              ))}
            </div>
          )}

        </div>

        {!collapsed && domain && date && (
          <div className="Summary__info">
            <a className="Summary__domain" href={domain} target="_blank" rel="noopener noreferrer">{domain}</a>
            <p className="Summary__report-date">{moment(date).format('DD.MM.YYYY HH:mm')}</p>
          </div>
        )}

        {auditsCount && (
          <div className={classNames('Summary__performance', {
            collapsed,
          })}
          >
            <div className="Summary__performance-item">
              <div className="Summary__performance-item-header">
                <div className="Summary__performance-item-header-col time">
                  {collapsed ? <TimeIcon /> : 'Load time'}
                </div>
              </div>
              <div className="Summary__performance-item-body">
                <div className="Summary__performance-item-body-col">
                  {getLoadTime(loadTime)}
                </div>
              </div>
            </div>

            {!collapsed && (
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
            )}

            {collapsed && (
              <>
                <div className="Summary__performance-item">
                  <div className="Summary__performance-item-header">
                    <div className="Summary__performance-item-header-col error">
                      <ErrorIcon />
                    </div>
                  </div>
                  <div className="Summary__performance-item-body">
                    <div className="Summary__performance-item-body-col">
                      {auditsCount.errors}
                    </div>
                  </div>
                </div>
                <div className="Summary__performance-item">
                  <div className="Summary__performance-item-header">
                    <div className="Summary__performance-item-header-col">
                      <TickIcon />
                    </div>
                  </div>
                  <div className="Summary__performance-item-body">
                    <div className="Summary__performance-item-body-col">
                      {auditsCount.passed}
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>
        )}
      </div>
    );
  }
}

export default Summary;