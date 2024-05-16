/**
 * @description Top level container for application
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalOff, changeHelpModalPage } from '../../actions'
import './styles.scss';

export const HelpModal = () => {

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.modal.helpModalPage);
  let pageButtonClicked = false;
  
  const pages = [
    <p>
      <h4>Contents</h4>
      <div className='tutorial-info'>- Use the arrows to navigate between tutorial pages -</div>
      <div className='tutorial-info'>- Click a link below to jump directly to a page -</div>
      <ol id='table-of-contents-list'>
        <li className='content-link' onClick={() => setPage(1)}>1. Welcome to myBarCart</li>
        <li className='content-link' onClick={() => setPage(2)}>2. The What</li>
        <li className='content-link' onClick={() => setPage(3)}>3. The Why</li>
        <li className='content-link' onClick={() => setPage(4)}>4. The How</li>
      </ol>
    </p>,
    <p className='blurb'>
      <h4>Welcome to myBarCart</h4>
      <div>This app is brought to you thanks to the wonderful devs at <em>thecocktailDB</em></div>
      <div>Visit their website at <a href='https://www.thecocktaildb.com/'>www.thecocktaildb.com/</a> and support them on their patreon at <a href='https://www.patreon.com/thedatadb'>www.patreon.com/thedatadb</a></div>
    </p>,
    <p className='blurb'>
      <h4>The What</h4>
      <div>myBarCart is a recipe generator.</div>
      <div>Instead of looking up recipes, though, myBarCart shows you recipes based on the ingredients you have.</div>
    </p>,
    <p className='blurb'>
      <h4>The Why</h4>
      <div>Short answer: Sometime you don't want to go to the store.</div>
      <div>myBarCart giver you the option to make something without needing to go out for ingredients!</div>
    </p>,
    <p className='blurb'>
      <h4>The How</h4>
      <div>-- In Development --</div>
    </p>
  ]

  const pageMax = pages.length - 1;

  const pageForward = () => {
    if(!pageButtonClicked) {
      pageButtonClicked = true;
      if(currentPage === pageMax) dispatch(changeHelpModalPage(0));
      else dispatch(changeHelpModalPage(currentPage + 1));
    };
  };

  const pageBack = () => {
    if(!pageButtonClicked) {
      pageButtonClicked = true;
      if(currentPage === 0) dispatch(changeHelpModalPage(pageMax));
      else dispatch(changeHelpModalPage(currentPage - 1));
    };
  };

  const setPage = (page) => {
    dispatch(changeHelpModalPage(page));
  }

  const closeModal = () => {
    dispatch(modalOff());
    dispatch(changeHelpModalPage(0));
  };

  return(
    <>
      <div className={`info-modal ${currentPage}`}>
        {pages[currentPage]}
        {currentPage === 0 ? <></> : <a className='table-of-contents' onClick={() => setPage(0)}>Table of Contents</a>}
        <div id="arrow-left" 
          className="page-arrow"
          onClick={pageBack}></div>
        <div id="arrow-right" 
          className="page-arrow"
          onClick={pageForward}></div>
      </div>
      <div className="help-modal-overlay" onClick={closeModal}></div>
    </>
  );
};