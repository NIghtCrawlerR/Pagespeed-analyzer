import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class CustomTabs extends Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <div>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={onChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Desktop" />
          <Tab label="Mobile" />
        </Tabs>
      </div>
    );
  }
}

export default CustomTabs;