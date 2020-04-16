import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";

import { Input, Button } from 'components/UI';
import { ReactComponent as RefreshIcon } from 'assets/img/refresh.svg';
import { ReactComponent as EraseIcon } from 'assets/img/erase.svg';
import { ReactComponent as InputIcon } from 'assets/img/domain.svg';

import './AnalyzeInput.scss';

const DOMAIN_REGEXP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

class AnalyzeInput extends Component {
  static propTypes = {
    startAnalyze: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.url && props.defaultUrl !== state.url) {
      return { url: props.defaultUrl };
    }

    return null;
  }

  state = {
    url: "",
    validationError: null,
  };

  changeHandler = url => this.setState({ url });

  checkIsValidDomain(domain) {
    var regExp = new RegExp(DOMAIN_REGEXP);

    return domain.match(regExp);
  }

  formatDomain = domain => {
    return `https://${domain}/`;
  }

  handleStartAnalyze = (url) => {
    const withHttp = url.includes('http') ? url : this.formatDomain(url);

    if (!this.checkIsValidDomain(withHttp)) {
      this.setState({
        validationError: 'URL is incorrect',
      });

      return false;
    }

    this.setState({ validationError: null, url: withHttp });

    this.props.startAnalyze(withHttp);
  }

  keyPressHandler = e => {
    if (e.keyCode === 13) {
      this.handleStartAnalyze(e.target.value);
    }
  }

  render() {
    const { url, validationError } = this.state;
    const { clearData, loading } = this.props;

    return (
      <div className="AnalyzeInput">
        <div className="AnalyzeInput__wrap">
          <div className="AnalyzeInput__input-group">
            <InputIcon />
            <Input
              type="text"
              placeholder="Enter URL"
              value={url}
              onKeyUp={this.keyPressHandler}
              onChange={({ target: { value } }) => this.changeHandler(value)}
            />
            {validationError && <p className="AnalyzeInput__error">{validationError}</p>}
          </div>
          <Button
            className="AnalyzeInput__analyze-button"
            disabled={!url || loading}
            onClick={() => this.handleStartAnalyze(url)}
          >
            Analyze
          </Button>
          <Button
            data-tip='Reanalyze'
            className="AnalyzeInput__reanalyze-button"
            textbutton
            disabled={!url || loading}
            onClick={() => this.handleStartAnalyze(url)}
          >
            <RefreshIcon />
          </Button>

          <Button
            data-tip='Clear data'
            textbutton
            color="red"
            onClick={clearData}
            disabled={!url || loading}
          >
            <EraseIcon />
          </Button>
          <ReactTooltip />
        </div>
      </div>
    );
  }
}

export default AnalyzeInput;
