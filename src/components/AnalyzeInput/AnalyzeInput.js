import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './AnalyzeInput.scss';

const DOMAIN_REGEXP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

class Input extends Component {
  static propTypes = {
    startAnalyze: PropTypes.func.isRequired,
  };

  state = {
    url: 'http://habr.com/',
    validationError: null,
  };

  changeHandler = url => this.setState({ url });

  checkIsValidDomain(domain) {
    var regExp = new RegExp(DOMAIN_REGEXP);
    return domain.match(regExp);
  }

  handleStartAnalyze = (url) => {
    if (!this.checkIsValidDomain(url)) {
      this.setState({
        validationError: 'URL is incorrect',
      });

      return false;
    }

    this.setState({ validationError: null });

    this.props.startAnalyze(url);
  }

  keyPressHandler = e => {
    if (e.keyCode === 13) {
      this.handleStartAnalyze(e.target.value);
    }
  }

  render() {
    const { url, validationError } = this.state;

    return (
      <div className="AnalyzeInput">
        <div className="AnalyzeInput__wrap">
          <div className="AnalyzeInput__input-group">
            <TextField
              label="URL"
              variant="outlined"
              value={url}
              onKeyUp={this.keyPressHandler}
              onChange={({ target: { value } }) => this.changeHandler(value)}
            />
            {validationError && <p className="AnalyzeInput__error">{validationError}</p>}
          </div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => this.handleStartAnalyze(url)}
          >
            Analyze
          </Button>
        </div>
      </div>
    );
  }
}

export default Input;
