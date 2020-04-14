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
  prepareContent = content => {
    if (typeof content === 'object' || !content) {
      return null;
    }

    if (typeof content === 'string') {
      return content.length > 70 ? content.slice(0, 70) + '...' : content;
    } else if (typeof content === 'number') {
      return parseFloat(content.toFixed(2));
    }

    return content;
  }

  render() {
    const { details: { headings, items } } = this.props;
    const headers = (headings || []).filter(({ label, text }) => label || text);

    return (
      <div className="AuditItemInfo">
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {headers && headers.map(header => (
                  <TableCell key={uuidv4()}>
                    <b>{header.label || header.text}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>

              {items && items.map(item => {
                return (
                  <TableRow hover key={uuidv4()}>
                    {headers.map((header, i) => {
                      const content = item[header.key];
                      console.log(item)
                      return (
                        <TableCell key={uuidv4()}>
                          {this.prepareContent(content)}
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