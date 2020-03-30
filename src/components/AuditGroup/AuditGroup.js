import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import AuditItem from '../AuditItem';
import './AuditGroup.scss';

class AuditGroup extends Component {
  render() {
    const { audits, progressbar } = this.props;

    return (
      <div className="AuditGroup">
        <TableContainer className="AuditGroup__table">
          <Table aria-label="a dense table">
            <TableBody>
              {audits.map(audit => (
                <AuditItem key={audit.id} audit={audit} progressbar={progressbar} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default AuditGroup;