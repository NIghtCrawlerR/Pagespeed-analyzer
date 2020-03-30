import React, { Component } from 'react';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getColorStatus } from '../../config';
import ColorIndicator from '../ColorIndicator';
import TextWithLink from '../TextWithLink';

import './Summary.scss';

class Summary extends Component {
  render() {
    const { summary, performance } = this.props;
    const colorStatus = getColorStatus(performance.score * 100);

    return (
      <div className="Summary">
        <div className="Summary__speed-score-wrap">
          <div className="Summary__speed-score">
            <CircularProgress
              variant="static"
              value={performance.score * 100}
              size={250}
              thickness={3}
              color="inherit"
              className={classNames("Summary__speed-score-progress", `Summary__speed-score-progress--${colorStatus}`)}
            />
            <div className={classNames(
              "Summary__speed-score-value",
              `color--${colorStatus}`,
            )}>
              {performance.score * 100} %
            </div>
          </div>
          <div className="Summary__speed-score-description">
            <p className="color--low">0 to 49: SLOW</p>
            <p className="color--mid">50 to 89: AVERAGE</p>
            <p className="color--high">90 to 100: FAST</p>
          </div>
        </div>

        <Grid container spacing={3}>
          {summary.map(item => (
            <Grid key={item.id} item xs={12} sm={6}>
              <div className="Summary__item">
                <div className="Summary__item-color-indicator">
                  <ColorIndicator score={item.score} />
                </div>
                <div className="Summary__item-description-wrap">
                  <div className="Summary__item-title">
                    <h3>{item.title}</h3>
                    <p className={`color--${getColorStatus(item.score * 100)}`}>{item.displayValue}</p>
                  </div>
                  <div className="Summary__item-description">
                    <TextWithLink text={item.description} />
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default Summary;