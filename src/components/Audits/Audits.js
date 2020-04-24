import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import AuditGroup from './components/AuditGroup';
import { Tabs } from 'components/UI';
import './Audits.scss';

import {
  LOAD_OPPORTUNITIES,
  DIAGNOSTICS,
  ERRORS,
  PASSED,
  showAsPassed,
} from 'config';

class Audits extends Component {
  static propTypes = {
    updateAuditsCount: PropTypes.func.isRequired,
    audits: PropTypes.object.isRequired,
    auditRefs: PropTypes.array.isRequired,
  };

  state = {
    activeTab: ERRORS,
  };

  componentDidMount() {
    this.props.updateAuditsCount(this.getAudits());
  }

  componentDidUpdate(prevProps) {
    const { auditRefs, updateAuditsCount } = this.props;

    if (!isEqual(prevProps.auditRefs, auditRefs)) {
      updateAuditsCount(this.getAudits());
    }
  }

  getAuditsByGroup = auditGroup => {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs
      .filter(({ group, id }) => group === auditGroup && !showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  getPassedAudits() {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs
      .filter(({ group, id }) => (group === LOAD_OPPORTUNITIES || group === DIAGNOSTICS) && showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  handleChange = activeTab => this.setState({ activeTab });

  getAudits = () => ({
    opportunities: this.getAuditsByGroup(LOAD_OPPORTUNITIES),
    diagnostics: this.getAuditsByGroup(DIAGNOSTICS),
    passedAudits: this.getPassedAudits(),
  });

  render() {
    const { activeTab } = this.state;
    const { opportunities, diagnostics, passedAudits } = this.getAudits();

    const failedAudits = [...opportunities, ...diagnostics];

    const tabs = [
      { label: 'Errors', value: ERRORS, showTab: failedAudits.length },
      { label: 'Passed audits', value: PASSED, showTab: passedAudits.length },
    ];

    const filteredTabs = tabs.filter(({ showTab }) => showTab);

    return (
      <div className="Audits">
        <Tabs
          tabs={filteredTabs}
          activeTab={activeTab}
          onChange={this.handleChange}
        />

        {activeTab === ERRORS && failedAudits.length && <AuditGroup audits={failedAudits} />}
        {activeTab === PASSED && passedAudits.length && <AuditGroup audits={passedAudits} />}

      </div>
    );
  }
}

export default Audits;