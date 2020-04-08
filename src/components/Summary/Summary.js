import React, { Component } from 'react';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';

import { getColorStatus } from '../../config';
import ColorIndicator from '../ColorIndicator';
import TextWithLink from '../TextWithLink';

import './Summary.scss';

class Summary extends Component {
  state = {
    showFull: false,
  };

  render() {
    const {
      summary: { summary, performance },
      domain,
      date,
    } = this.props;

    const { showFull } = this.state;

    const normalizeDate = date => {
      return date < 10 ? `0${date}` : date;
    }

    const getDate = reportDate => {
      const date = new Date(reportDate);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${normalizeDate(day)}-${normalizeDate(month)}-${year} ${hours}:${minutes}`
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
            <p className="Summary__report-date">Report from: {getDate(date)}</p>
            <a className="Summary__domain" href={domain} target="_blank">{domain}</a>
            <p className="Summary__speed-score-text color--low">0 to 49: Slow</p>
            <p className="Summary__speed-score-text color--mid">50 to 89: Average</p>
            <p className="Summary__speed-score-text color--high">90 to 100: Fast</p>
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