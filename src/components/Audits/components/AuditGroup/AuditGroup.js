import React, { Component } from 'react';

import { Table, TableBody } from 'components/UI';
import AuditItem from '../AuditItem';
import './AuditGroup.scss';

class AuditGroup extends Component {
  render() {
    const { audits, progressbar } = this.props;

    return (
      <div className="AuditGroup">
        <div className="AuditGroup__table">
          {!audits.length && <p className="AuditGroup__empty-stub">No audits</p>}
          <Table>
            <TableBody>
              {audits.map(audit => (
                <AuditItem key={audit.id} audit={audit} progressbar={progressbar} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AuditGroup;