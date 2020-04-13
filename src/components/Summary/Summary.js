import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';

import { getColorStatus } from '../../config';
import ColorIndicator from '../ColorIndicator';
import TextWithLink from '../TextWithLink';

import './Summary.scss';

const SCORE_GUIDE = [{
  value: '0 - 40',
  color: 'low',
}, {
  value: '50 - 89',
  color: 'mid',
}, {
  value: '90 - 100',
  color: 'high',
}]

class Summary extends Component {
  state = {
    showFull: false,
  };

  render() {
    const {
      summary: { summary, performance },
      domain,
      date,
      loadTime,
      auditsCount,
    } = this.props;

    const { showFull } = this.state;

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
              size={230}
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
          <div className="Summary__speed-score-description">
            <p className="Summary__report-date">Report date: {moment(date).format('DD.MM.YYYY HH:mm')}</p>
            <a className="Summary__domain" href={domain} target="_blank">{domain}</a>

            <div className="Summary__grid">
              <p className="Summary__grid-item"><b>Load time:</b> <br /> {getLoadTime(loadTime)}</p>
              <p className="Summary__grid-item"><b>Errors:</b> <br /> {auditsCount.errors} </p>
              <p className="Summary__grid-item"><b>Passed:</b> <br /> {auditsCount.passed} </p>
              <div className="Summary__score-guide">
                {SCORE_GUIDE.map(({ value, color }, i) => (
                  <p key={i} className="Summary__score-guide-item">
                    <span className={classNames("Summary__score-guide-indicator", `bg-color--${color}`)} />
                    {value}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="Summary__metrics">
          <div className="Summary__metrics-switcher">
            <Switch
              checked={showFull}
              onChange={() => this.setState({ showFull: !showFull })}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
          <Grid container spacing={3}>
            {summary.map(item => (
              <Grid key={item.id} item xs={12} sm={6} className="Summary__item-wrap">
                <div className="Summary__item">
                  <div className="Summary__item-color-indicator">
                    <ColorIndicator score={item.score} />
                  </div>
                  <div className="Summary__item-description-wrap">
                    <div className="Summary__item-title">
                      <h3>{item.title}</h3>
                      <p className={`color--${getColorStatus(item.score * 100)}`}>{item.displayValue}</p>
                    </div>
                    {showFull && (
                      <div className="Summary__item-description">
                        <TextWithLink text={item.description} />
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Summary;