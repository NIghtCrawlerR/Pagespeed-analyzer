import React, { Component } from 'react';

import AuditGroup from '../AuditGroup';

const LOAD_OPPORTUNITIES = "load-opportunities";
const DIAGNOSTICS = "diagnostics"; 

class Audits extends Component {
  getAuditsByGroup = auditGroup => {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs.filter(({ group, id }) => group === auditGroup && !this.showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  passedAudits() {
    const { audits, auditRefs } = this.props;
    const ids = auditRefs
      .filter(({ group, id }) => (group === LOAD_OPPORTUNITIES || group === DIAGNOSTICS) && this.showAsPassed(audits[id]));

    return ids.map(ref => audits[ref.id]);
  }

  showAsPassed(audit) {
    const PASS_THRESHOLD = 0.9;
    const RATINGS = {
      PASS: { label: "pass", minScore: PASS_THRESHOLD },
      AVERAGE: { label: "average", minScore: 0.5 },
      FAIL: { label: "fail" },
      ERROR: { label: "error" }
    };

    switch (audit.scoreDisplayMode) {
      case "manual":
      case "notApplicable":
        return true;
      case "error":
      case "informative":
        return false;
      case "numeric":
      case "binary":
      default:
        return Number(audit.score) >= RATINGS.PASS.minScore;
    }
  }

  render() {
    return (
      <div className="Audits">
        Audits

        <AuditGroup audits={this.getAuditsByGroup(LOAD_OPPORTUNITIES)} />
        <AuditGroup audits={this.getAuditsByGroup(DIAGNOSTICS)} />
        <AuditGroup audits={this.passedAudits()} />
      </div>
    );
  }
}

export default Audits;