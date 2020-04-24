import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';

import './TextWithLink.scss';

const linkRegExp = /\[Learn more\]\(([^)]+)\)/gi;

const TextWithLink = ({ text }) => (
  <p className="TextWithLink">
    {reactStringReplace(text, linkRegExp, (link, i) => (
      <a
        key={i}
        href={link}
        className="TextWithLink__link"
        target="_blank"
        rel="noopener noreferrer"
      >Learn more</a>
    ))}
  </p>
);

TextWithLink.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextWithLink;
