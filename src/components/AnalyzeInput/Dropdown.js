import React from 'react';
import onClickOutside from 'react-onclickoutside';

class Dropdown extends React.Component {
  state = {
    isOpen: false,
  };

  handleClickOutside() {
    this.close();
  }

  open = () => this.setState({ isOpen: true });
  close = () => this.setState({ isOpen: false });

  getUrls = () => {
    const savedUrls = localStorage.getItem('savedUrls');

    if (!savedUrls) return null;

    return JSON.parse(savedUrls);
  };

  render() {
    const { setDomain } = this.props;
    const savedUrls = this.getUrls();

    return (
      <div className="Dropdown">
        {this.state.isOpen && savedUrls && (
          <div className="Dropdown__inner">
            <div className="SavelUrls__list">
              {savedUrls.map(domain => (
                <p
                  key={domain}
                  onClick={() => setDomain(domain)}
                  className="SavelUrls__list-item"
                >{domain}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Dropdown);