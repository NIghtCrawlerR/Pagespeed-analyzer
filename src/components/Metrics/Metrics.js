import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getColorStatus } from 'config';
import { ColorIndicator, Switcher, TextWithLink } from 'components/UI';

import './Metrics.scss';

const Metrics = ({ metrics }) => {
  const [showDescriptoin, setToggle] = useState(false);

  return (
    <div className="Metrics">
      <Switcher onChange={() => setToggle(!showDescriptoin)} />

      <div className="Metrics__items">
        {metrics.map(item => (
          <div key={item.id} className="Metrics__item">
            <div className="Metrics__item-color-indicator">
              <ColorIndicator score={item.score} />
            </div>
            <div className="Metrics__item-description-wrap">
              <div className="Metrics__item-title">
                <h3>{item.title}</h3>
                <p className={`color--${getColorStatus(item.score * 100)}`}>{item.displayValue}</p>
              </div>
              {showDescriptoin && (
                <div className="Metrics__item-description">
                  <TextWithLink text={item.description} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Metrics.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Metrics;