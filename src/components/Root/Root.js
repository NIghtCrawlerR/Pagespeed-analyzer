import React, { Component } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';

import AnalyzeInput from '../AnalyzeInput';
import Audits from '../Audits';

const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed/';

class Root extends Component {
  state = {
    audits: null,
    auditRefs: null,
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

    this.setState({ auditRefs, audits });
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
    const { audits, auditRefs } = this.state;
    return (
      <Container maxWidth="md">
        <AnalyzeInput startAnalyze={this.startAnalyze} />
        {audits && <Audits audits={audits} auditRefs={auditRefs} />}
      </Container>
    );
  }
}

export default Root;