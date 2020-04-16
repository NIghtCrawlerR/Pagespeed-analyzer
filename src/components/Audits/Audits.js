import React, { Component } from 'react';
import { isEqual } from 'lodash';

import AuditGroup from './components/AuditGroup';
import { Tabs } from 'components/UI';
import './Audits.scss';

import {
  LOAD_OPPORTUNITIES,
  DIAGNOSTICS,
  PASSED,
  showAsPassed,
} from '../../config';

class Audits extends Component {
  state = {
    activeTab: LOAD_OPPORTUNITIES,
    tabs: [],
  };

  componentDidMount() {
    this.props.updateAuditsCount(this.getAudits());
    this.setState({ tabs: this.getTabs() });
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.auditRefs, this.props.auditRefs)) {
      this.props.updateAuditsCount(this.getAudits());
    }
  }

  getAuditsByGroup = auditGroup => {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs.filter(({ group, id }) => group === auditGroup && !showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  getPassedAudits() {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs
      .filter(({ group, id }) => (group === LOAD_OPPORTUNITIES || group === DIAGNOSTICS) && showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  handleChange = (activeTab) => {
    this.setState({ activeTab })
  }

  getAudits = () => ({
    opportunities: this.getAuditsByGroup(LOAD_OPPORTUNITIES),
    diagnostics: this.getAuditsByGroup(DIAGNOSTICS),
    passedAudits: this.getPassedAudits(),
  })

  getTabs = () => {
    const { opportunities, diagnostics, passedAudits } = this.getAudits();

    const tabs = [
      { label: 'Opportunities', value: LOAD_OPPORTUNITIES, showTab: opportunities.length },
      { label: 'Diagnostics', value: DIAGNOSTICS, showTab: diagnostics.length },
      { label: 'Sussessfull audits', value: PASSED, showTab: passedAudits.length },
    ];

    const filteredTabs = tabs.filter(({ showTab }) => !!showTab);

    this.setState({ activeTab: filteredTabs[0].value });

    return filteredTabs;
  }

  render() {
    const { activeTab, tabs } = this.state;
    const { opportunities, diagnostics, passedAudits } = this.getAudits();

    return (
      <div className="Audits">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={this.handleChange}
        />

        {activeTab === LOAD_OPPORTUNITIES && opportunities.length && <AuditGroup audits={opportunities} progressbar />}
        {activeTab === DIAGNOSTICS && diagnostics.length && <AuditGroup audits={diagnostics} />}
        {activeTab === PASSED && passedAudits.length && <AuditGroup audits={passedAudits} />}

      </div>
    );
  }
}

export default Audits;