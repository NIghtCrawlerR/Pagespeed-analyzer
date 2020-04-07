import React, { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  PAGESPEED_API_URL,
  SUMMARY_KEYS,
} from '../../config';
import AnalyzeInput from '../AnalyzeInput';
import Summary from '../Summary';
import Audits from '../Audits';

import './PagespeedAnalyzer.scss';

class PagespeedAnalyzer extends Component {
  state = {
    audits: null,
    auditRefs: null,
    summary: null,
    domain: null,
    loading: false,
  };

  componentDidMount() {
    const data = localStorage.getItem('lightHouseData');

    if (!data) return null;

    const parsedData = JSON.parse(data);

    this.setData(parsedData);
  }

  setData = data => {
    const { lighthouseResult, id: domain } = data;

    const audits = lighthouseResult.audits;
    const auditRefs = lighthouseResult.categories.performance.auditRefs;
    const performance = lighthouseResult.categories.performance;
    const summary = SUMMARY_KEYS.map(key => lighthouseResult.audits[key]);

    this.setState({
      audits,
      auditRefs,
      summary: { summary, performance },
      domain,
      loading: false,
      requestError: null,
    });
  }

  startAnalyze = async url => {
    this.setState({ loading: true, requestError: null });

    const request = {
      method: 'GET',
      url: PAGESPEED_API_URL,
      params: {
        url,
        strategy: 'desktop',
      }
    };

    try {
      const { data } = await axios(request);
      localStorage.setItem('lightHouseData', JSON.stringify(data));

      this.setData(data);
    } catch (err) {
      this.setState({
        requestError: err,
        loading: false,
      });
    }
  }

  render() {
    const {
      audits,
      auditRefs,
      summary,
      loading,
      domain,
      requestError,
    } = this.state;

    const noData = !loading && !audits && !requestError;

    return (
      <div className="PagespeedAnalyzer">
        {loading && <LinearProgress color="primary" />}
        <Container maxWidth="md">
          <AnalyzeInput startAnalyze={this.startAnalyze} defaultUrl={domain} />

          <div className="PagespeedAnalyzer__content-wrap">
            {!loading && !requestError && (
              <>
                {summary && <Summary summary={summary} domain={domain} />}
                {audits && <Audits audits={audits} auditRefs={auditRefs} />}
              </>
            )}

            {noData && (
              <p className="PagespeedAnalyzer__stub-text">Enter url to start analyze</p>
            )}

            {!loading && requestError && (
              <div className="PagespeedAnalyzer__error">
                <h3 className="PagespeedAnalyzer__error-title">Oops! Something went wrong. Try again</h3>
                <p className="PagespeedAnalyzer__error-text">{requestError.message}</p>
              </div>
            )}

            {loading && (
              <p className="PagespeedAnalyzer__stub-text">
                Loading
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </p>
            )}
          </div>

        </Container>
      </div>
    );
  }
}

export default PagespeedAnalyzer;