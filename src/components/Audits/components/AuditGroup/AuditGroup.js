import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableBody } from 'components/UI';
import AuditItem from '../AuditItem';

import './AuditGroup.scss';

const AuditGroup = ({ audits, progressbar }) => (
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

AuditGroup.propTypes = {
  audits: PropTypes.array.isRequired,
  progressbar: PropTypes.bool, 
};

AuditGroup.defaultProps = {
  progressbar: false,
};

export default AuditGroup;