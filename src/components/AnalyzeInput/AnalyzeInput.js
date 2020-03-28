import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import './AnalyzeInput.scss';

class Input extends Component {
  static propTypes = {
    startAnalyze: PropTypes.func.isRequired,
  };

  state = {
    url: 'http://habr.com/',
  };

  changeHandler = url => this.setState({ url });

  render() {
    const { startAnalyze } = this.props;
    const { url } = this.state;

    return (
      <div className="AnalyzeInput">
        <div className="AnalyzeInput-wrap">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                value={url}
                onChange={({ target: { value } }) => this.changeHandler(value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => startAnalyze(url)}
              >
                Analyze
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Input;
