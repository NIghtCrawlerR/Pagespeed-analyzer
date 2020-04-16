import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from 'components/UI';

import Chains from './Chains';
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
    const { details: { headings, items, chains } } = this.props;
    const headers = (headings || []).filter(({ label, text }) => label || text);

    return (
      <div className="AuditItemInfo">
        <Table size="small" aria-label="a dense table">
          {!chains && (
            <TableHead>
              <TableRow>
                {headers && headers.map(header => (
                  <TableCell key={uuidv4()}>
                    <b>{header.label || header.text}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>

            {chains && (
              <TableRow>
                <Chains chains={chains} />
              </TableRow>
            )}
            {items && items.map(item => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default AuditItemInfo;