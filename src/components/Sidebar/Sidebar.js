import React, { useEffect, useLayoutEffect, useState } from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { ReactComponent as MenuIcon } from 'assets/img/menu.svg';

import './Sidebar.scss';

const S = 768;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Sidebar = ({ children }) => {
  const [width] = useWindowSize();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isOpen, setOpen] = useState(!isMobile);

  useEffect(() => {
    setOpen(width > S);
  }, [width]);

  return (
    <div className={classNames('Sidebar', {
      'Sidebar--collapsed': !isOpen,
    })}
    >
      {isMobile && (
        <div
          className="Sidebar__collapse-button"
          onClick={() => setOpen(!isOpen)}
        >
          <MenuIcon />
        </div>
      )}
      {children(!isOpen)}
    </div>
  );
}

export default Sidebar;