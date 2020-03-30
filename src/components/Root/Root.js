import React, { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';

import {
  PAGESPEED_API_URL,
  SUMMARY_KEYS,
} from '../../config';
import AnalyzeInput from '../AnalyzeInput';
import Summary from '../Summary';
import Audits from '../Audits';

class Root extends Component {
  state = {
    audits: null,
    auditRefs: null,
    summary: null,
  };

  componentDidMount() {
    const data = localStorage.getItem('lightHouseData');

    if (!data) return null;

    const parsedData = JSON.parse(data);
    this.setData(parsedData);
  }

  setData = data => {
    const { lighthouseResult } = data;

    const audits = lighthouseResult.audits;
    const auditRefs = lighthouseResult.categories.performance.auditRefs;
    const performance = lighthouseResult.categories.performance;
    const summary = SUMMARY_KEYS.map(key => lighthouseResult.audits[key]);

    this.setState({ auditRefs, audits, summary, performance });
  }

  startAnalyze = async url => {
    const request = {
      method: 'GET',
      url: PAGESPEED_API_URL,
      params: {
        url,
        strategy: 'desktop',
      }
    };

    const { data } = await axios(request);

    localStorage.setItem('lightHouseData', JSON.stringify(data));

    this.setData(data);
  }

  render() {
    const { audits, auditRefs, summary, performance } = this.state;

    return (
      <Container maxWidth="md">
        <AnalyzeInput startAnalyze={this.startAnalyze} />
        {summary && <Summary summary={summary} performance={performance} />}
        {audits && <Audits audits={audits} auditRefs={auditRefs} />}
      </Container>
    );
  }
}

export default Root;