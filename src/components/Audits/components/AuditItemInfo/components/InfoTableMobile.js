import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Chains from './Chains';

import './InfoTableMobile.scss';

const InfoTableMobile = ({ details }) => {
  const { headings, items, chains } = details;
  console.log(details);
  const headers = (headings || []).filter(({ label, text }) => label || text);

  const prepareContent = (content, key) => {
    let cell = '';

    if (typeof content === 'object' || !content) {
      return null;
    }

    if (typeof content === 'string') {
      cell = content.length > 70 ? content.slice(0, 70) + '...' : content;
    } else if (typeof content === 'number') {
      cell = parseFloat(content.toFixed(2));
    }

    return (
      <>
        <p className="InfoTableMobile__item-title">{key}:</p>
        <p className="InfoTableMobile__item-value">{cell}</p>
      </>
    );
  };

  return (
    <div className="InfoTableMobile">
      {chains && <Chains chains={chains} />}

      {items && items.map(item => (
        <div key={uuidv4()} className="InfoTableMobile__row">
          {headers.map(header => {
            const content = item[header.key];

            return (
              <div className="InfoTableMobile__item" key={header.key}>
                {prepareContent(content, header.key)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

InfoTableMobile.propTypes = {
  details: PropTypes.shape({
    headings: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    chains: PropTypes.object,
  }).isRequired,
};

export default InfoTableMobile;