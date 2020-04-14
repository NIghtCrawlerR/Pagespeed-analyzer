import React, { Component } from 'react';
import classNames from 'classnames';

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

export default Tabs;