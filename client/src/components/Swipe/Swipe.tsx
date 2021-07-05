import React, { useEffect, useState } from 'react';

import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as TwoArrowIcon } from './icons/two-arrows.svg';

import './Swipe.scss';

// Only one example on page!!!
export const Swipe = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const clientHeight = window.innerHeight;
  const buttonWidthInVH = 10;
  const clientHeightWithoutBtn = clientHeight / buttonWidthInVH;
  const isToTop = scrollY > clientHeight / 2;

  const onClickHandler = () => {
    const top = isToTop ? 0 : clientHeight - clientHeightWithoutBtn;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="swipe">
      <button
        title={isToTop ? 'Press to see map' : 'Press to see form'}
        className="button button--hovered"
        onClick={onClickHandler}
      >
        <TwoArrowIcon
          className={isToTop ? 'arrow-icon arrow-icon--reversed' : 'arrow-icon'}
        ></TwoArrowIcon>
      </button>
    </div>
  );
};
