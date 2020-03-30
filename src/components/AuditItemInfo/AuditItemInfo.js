import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './AuditItemInfo.scss';

class AuditItemInfo extends Component {

  render() {
    const { details: { headings, items } } = this.props;
    console.log(headings)
    return (
      <div className="AuditItemInfo">
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {headings && headings.map(header => (
                  <TableCell key={uuidv4()}>
                    <b>{header.label || header.text}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>

              {items && items.map((item, i) => {
                return (
                  <TableRow hover key={uuidv4()}>
                    {headings.map((header, i) => {
                      const content = item[header.key];
                      return (
                        <TableCell key={uuidv4()}>
                          {typeof content !== 'object' && (
                            <div>{content && content.length > 70 ? content.slice(0, 70) + '...' : content}</div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default AuditItemInfo;