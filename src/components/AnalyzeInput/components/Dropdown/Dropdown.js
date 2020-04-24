import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './Dropdown.scss';

class Dropdown extends React.Component {
  static propTypes = {
    setDomain: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
    domainsList: [],
  };

  handleClickOutside() {
    this.close();
  }

  open = () => {
    this.getUrls();
    this.setState({ isOpen: true });
  };

  close = () => this.setState({ isOpen: false });

  getUrls = () => {
    const savedUrls = localStorage.getItem('savedUrls');

    if (!savedUrls) return null;
    this.setState({ domainsList: JSON.parse(savedUrls) });
  };


  deleteDomain = domain => {
    const domainsList = JSON.parse(localStorage.getItem('savedUrls'));

    const newDomainsList = domainsList.filter(currentDomain => currentDomain !== domain);
    localStorage.setItem('savedUrls', JSON.stringify(newDomainsList));

    this.setState({ domainsList: newDomainsList });
  };

  render() {
    const { setDomain } = this.props;
    const { domainsList, isOpen } = this.state;

    const showDropdown = isOpen && domainsList.length > 0;

    return (
      <div className="Dropdown">
        {showDropdown && (
          <div className="Dropdown__inner">
            <div className="Dropdown__list">
              {domainsList.map(domain => (
                <p
                  key={domain}
                  className="Dropdown__list-item"
                >
                  <span onClick={() => setDomain(domain)}>
                    {domain}
                  </span>
                  <span
                    className="delete-button"
                    onClick={() => this.deleteDomain(domain)}
                  >✕</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
