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
import CustomTabs from '../CustomTabs';

import './PagespeedAnalyzer.scss';

class PagespeedAnalyzer extends Component {
  state = {
    audits: null,
    auditRefs: null,
    summary: null,
    domain: null,
    loading: false,
    requestError: null,
    analysisUTCTimestamp: null,
    currentStrategy: 'desktop',
    loadTime: null,
    auditsCount: {},
  };

  componentDidMount() {
    this.setStoredData();
  }

  setStoredData = () => {
    const data = localStorage.getItem('lightHouseData');
    if (!data) return null;

    const parsedData = JSON.parse(data);
    this.setData(parsedData);
  }

  setData = data => {
    const strategyData = data[this.state.currentStrategy];

    const { lighthouseResult, id: domain, analysisUTCTimestamp } = strategyData;

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
      analysisUTCTimestamp,
      loadTime: audits.metrics.numericValue,
    });
  }

  startAnalyze = async url => {
    this.setState({ loading: true, requestError: null });

    const requestData = strategy => ({
      method: 'GET',
      url: PAGESPEED_API_URL,
      params: {
        url,
        strategy,
      }
    })

    try {
      const desktop = await axios(requestData('desktop'));
      const mobile = await axios(requestData('mobile'));

      const data = {
        desktop: desktop.data,
        mobile: mobile.data,
      };

      localStorage.setItem('lightHouseData', JSON.stringify(data));

      this.setData(data);
    } catch (err) {
      this.setState({
        requestError: err,
        loading: false,
      });
    }
  }

  clearData = () => {
    localStorage.clear();

    this.setState({
      audits: null,
      auditRefs: null,
      summary: null,
      domain: null,
      loading: false,
      requestError: null,
      analysisUTCTimestamp: null,
    });
  }

  switchStrategy = (event, newValue) => {
    this.setState({
      currentStrategy: newValue ? 'mobile' : 'desktop',
    }, () => this.setStoredData());
  };

  updateAuditsCount = audits => {
    const { opportunities, diagnostics, passedAudits } = audits;
    const auditsCount = {
      errors: opportunities.length + diagnostics.length,
      passed: passedAudits.length,
    };

    this.setState({ auditsCount });
  }

  render() {
    const {
      audits,
      auditRefs,
      summary,
      loading,
      domain,
      requestError,
      analysisUTCTimestamp,
      currentStrategy,
      loadTime,
      auditsCount,
    } = this.state;

    const noData = !loading && !audits && !requestError;

    return (
      <div className="PagespeedAnalyzer">
        <div className="PagespeedAnalyzer__progress-wrap">
          {loading && <LinearProgress color="primary" />}
        </div>
        <Container maxWidth="md">
          <AnalyzeInput startAnalyze={this.startAnalyze} clearData={this.clearData} defaultUrl={domain} />

          <div className="PagespeedAnalyzer__content-wrap">
            {!loading && !requestError && (
              <>
                {summary && (
                  <>
                    <CustomTabs
                      value={currentStrategy === 'desktop' ? 0 : 1}
                      onChange={this.switchStrategy}
                    />
                    <Summary
                      summary={summary}
                      domain={domain}
                      loadTime={loadTime}
                      date={analysisUTCTimestamp}
                      auditsCount={auditsCount}
                    />
                  </>
                )}
                {audits && <Audits updateAuditsCount={this.updateAuditsCount} audits={audits} auditRefs={auditRefs} />}
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