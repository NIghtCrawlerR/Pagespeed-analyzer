import React, { Component } from 'react';
import axios from 'axios';

import {
  PAGESPEED_API_URL,
  METRICS_KEYS,
  STRATEGY_TABS,
} from 'config';
import AnalyzeInput from '../AnalyzeInput';
import Layout from '../Layout';
import Sidebar from '../Sidebar';
import Summary from '../Summary';
import Metrics from '../Metrics';
import Audits from '../Audits';
import { Tabs } from 'components/UI';
import { Desktop } from 'components/Media';
import { ReactComponent as AnalyzeIcon } from 'assets/img/chart-gray.svg';
import { ReactComponent as CogsIcon } from 'assets/img/cogs.svg';
import { ReactComponent as ErrorIcon } from 'assets/img/error.svg';

import './PagespeedAnalyzer.scss';

class PagespeedAnalyzer extends Component {
  state = {
    audits: null,
    auditRefs: null,
    metrics: null,
    performance: null,
    domain: null,
    loading: false,
    requestError: null,
    analysisUTCTimestamp: null,
    currentStrategy: 'desktop',
    loadTime: null,
    auditsCount: null,
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
    const metrics = METRICS_KEYS.map(key => lighthouseResult.audits[key]);

    this.setState({
      audits,
      auditRefs,
      metrics,
      performance,
      domain,
      loading: false,
      requestError: null,
      analysisUTCTimestamp,
      loadTime: audits.metrics.numericValue,
    });

    this.saveToStorage(domain);
  }

  saveToStorage = (newUrl) => {
    const savedUrls = localStorage.getItem('savedUrls');
    const newUrlsArr = savedUrls ? JSON.parse(savedUrls) : [];

    if (!newUrlsArr.includes(newUrl)) {
      newUrlsArr.push(newUrl);
    }

    localStorage.setItem('savedUrls', JSON.stringify(newUrlsArr));
  }

  startAnalyze = async url => {
    this.clearData();
    this.setState({ loading: true, requestError: null });

    const requestData = strategy => ({
      method: 'GET',
      url: PAGESPEED_API_URL,
      params: {
        url,
        strategy,
      }
    });

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
    localStorage.removeItem('lightHouseData');

    this.setState({
      audits: null,
      auditRefs: null,
      metrics: null,
      performance: null,
      domain: null,
      loading: false,
      requestError: null,
      analysisUTCTimestamp: null,
      auditsCount: null,
    });
  }

  switchStrategy = value => {
    this.setState({
      currentStrategy: value,
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
      metrics,
      performance,
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
      <Layout>
        <Sidebar>
          {collapsed => (
            <>
              <Desktop>
                <Tabs
                  tabs={STRATEGY_TABS}
                  activeTab={currentStrategy}
                  onChange={this.switchStrategy}
                />
              </Desktop>

              <Summary
                performance={performance}
                domain={domain}
                loadTime={loadTime}
                date={analysisUTCTimestamp}
                auditsCount={auditsCount}
                collapsed={collapsed}
              />
            </>
          )}
        </Sidebar>
        <div className="PagespeedAnalyzer">
          <div className="PagespeedAnalyzer__header">
            <AnalyzeInput
              startAnalyze={this.startAnalyze}
              clearData={this.clearData}
              defaultUrl={domain}
              loading={loading}
            />
          </div>

          <div className="PagespeedAnalyzer__content-wrap">
            {!loading && !requestError && (
              <>
                {metrics && <Metrics metrics={metrics} />}
                {audits && <Audits updateAuditsCount={this.updateAuditsCount} audits={audits} auditRefs={auditRefs} />}
              </>
            )}


            {noData && (
              <p className="PagespeedAnalyzer__stub-text">
                Enter url to start analyze
                <AnalyzeIcon />
              </p>
            )}

            {!loading && requestError && (
              <div className="PagespeedAnalyzer__error">
                <ErrorIcon />
                <h3 className="PagespeedAnalyzer__error-title">Oops! Something went wrong.</h3>
                <p className="PagespeedAnalyzer__error-text">{requestError.message}</p>
              </div>
            )}

            {loading && (
              <p className="PagespeedAnalyzer__stub-text">
                <div>
                  Loading
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
                <CogsIcon />
              </p>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default PagespeedAnalyzer;