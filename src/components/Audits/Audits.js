import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AuditGroup from '../AuditGroup';
import './Audits.scss';

import {
  LOAD_OPPORTUNITIES,
  DIAGNOSTICS,
  showAsPassed,
} from '../../config';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const tabProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

class Audits extends Component {
  state = {
    value: 0,
  };

  getAuditsByGroup = auditGroup => {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs.filter(({ group, id }) => group === auditGroup && !showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  passedAudits() {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs
      .filter(({ group, id }) => (group === LOAD_OPPORTUNITIES || group === DIAGNOSTICS) && showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state;
    const opportunities = this.getAuditsByGroup(LOAD_OPPORTUNITIES);
    const diagnostics = this.getAuditsByGroup(DIAGNOSTICS);
    const passedAudits = this.passedAudits();

    return (
      <div className="Audits">
        <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="Opportunities" {...tabProps(0)} />
          <Tab label="Diagnostics" {...tabProps(1)} />
          <Tab label="Sussessfull audits" {...tabProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AuditGroup audits={opportunities} progressbar />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AuditGroup audits={diagnostics} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AuditGroup audits={passedAudits} />
        </TabPanel>
      </div>
    );
  }
}

export default Audits;