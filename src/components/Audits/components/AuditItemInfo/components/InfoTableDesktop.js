import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from 'components/UI';
import Chains from './Chains';

const InfoTableDesktop = ({ details }) => {
  const { headings, items, chains } = details;
  const headers = (headings || []).filter(({ label, text }) => label || text);

  const prepareContent = content => {
    if (typeof content === 'object' || !content) {
      return null;
    }

    if (typeof content === 'string') {
      return content.length > 70 ? content.slice(0, 70) + '...' : content;
    } else if (typeof content === 'number') {
      return parseFloat(content.toFixed(2));
    }

    return content;
  };

  return (
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
          <TableRow key={uuidv4()}>
            {headers.map(header => {
              const content = item[header.key];

              return (
                <TableCell key={uuidv4()}>
                  {prepareContent(content)}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InfoTableDesktop;