import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import AuditItem from '../AuditItem';

import './AuditGroup.scss';

class AuditGroup extends Component {
  render() {
    const { audits } = this.props;

    // console.log(audits);
    return (
      <div className="AuditGroup">
        AuditItem

        <TableContainer component={Paper}>
          <Table aria-label="a dense table">
            <TableBody>
              {audits.map(audit => (
                <AuditItem audit={audit} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default AuditGroup;