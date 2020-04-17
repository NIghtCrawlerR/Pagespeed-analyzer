import React, { Component } from 'react';

import { Desktop, Mobile } from 'components/Media';
import InfoTableDesktop from './components/InfoTableDesktop';
import InfoTableMobile from './components/InfoTableMobile';

import './AuditItemInfo.scss';

class AuditItemInfo extends Component {
  render() {
    const { details } = this.props;

    return (
      <div className="AuditItemInfo">
        <Desktop>
          <InfoTableDesktop details={details} />
        </Desktop>
        <Mobile>
          <InfoTableMobile details={details} />
        </Mobile>
      </div>
    );
  }
}

export default AuditItemInfo;