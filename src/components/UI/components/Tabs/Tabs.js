import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Tabs.scss';

class Tabs extends Component {
  render() {
    const { onChange, tabs, activeTab } = this.props;

    return (
      <div className="Tabs">
        {tabs.map(({ label, value }) => (
          <div
            key={value}
            className={classNames('Tabs__item', {
              'Tabs__item--active': value === activeTab,
            })}
            onClick={() => onChange(value)}
          >
            {label}
          </div>
        ))}
      </div>
    );
  }
}

Tabs.propTypes = {
  onChange: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  activeTab: PropTypes.string,
};

Tabs.defaultProps = {
  onChange: () => {},
  activeTab: '',
};

export default Tabs;