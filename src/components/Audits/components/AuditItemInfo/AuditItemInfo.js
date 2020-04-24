import React from 'react';
import PropTypes from 'prop-types';

import { Desktop, Mobile } from 'components/Media';
import InfoTableDesktop from './components/InfoTableDesktop';
import InfoTableMobile from './components/InfoTableMobile';

import './AuditItemInfo.scss';

const AuditItemInfo = ({ details }) => (
  <div className="AuditItemInfo">
    <Desktop>
      <InfoTableDesktop details={details} />
    </Desktop>
    <Mobile>
      <InfoTableMobile details={details} />
    </Mobile>
  </div>
);

AuditItemInfo.propTypes = {
  details: PropTypes.object.isRequired,
};

export default AuditItemInfo;