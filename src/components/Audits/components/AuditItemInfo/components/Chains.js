import React from 'react';

import './Chains.scss';

const Chains = ({ chains }) => {


  const renderChildren = (children) => {
    return Object.keys(children).map(key => {
      const shortenUrl = url => {
        return url.length > 70 ? url.slice(0, 70) + '...' : url;
      }

      return (
        <div className="Chains__request">
          <p className="Chains__request-title">{shortenUrl(children[key].request.url)}</p>
          <div className="Chains__request-children">
            {children[key].children && renderChildren(children[key].children)}
          </div>
        </div>
      )
    })
  };

  return (
    <div className="Chains">
      {renderChildren(chains)}
    </div>
  );
}

export default Chains;