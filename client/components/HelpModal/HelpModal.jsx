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
    <div>
      <h4>Contents</h4>
      <p>
        <span className='tutorial-info'>- Use the arrows to navigate between tutorial pages -</span><br/>
        <span className='tutorial-info'>- Click a link below to jump directly to a page -</span><br/>
        <ol id='table-of-contents-list'>
          <li className='content-link' onClick={() => setPage(1)}>1. Welcome to myBarCart</li>
          <li className='content-link' onClick={() => setPage(2)}>2. The What</li>
          <li className='content-link' onClick={() => setPage(3)}>3. The Why</li>
          <li className='content-link' onClick={() => setPage(4)}>4. The How</li>
        </ol>
      </p>
    </div>,
    <div className='blurb'>
      <h4>Welcome to myBarCart</h4>
      <p>
        <span>This app is brought to you thanks to the wonderful devs at <em>thecocktailDB</em></span><br/>
        <span>Visit their website at <a href='https://www.thecocktaildb.com/'>www.thecocktaildb.com/</a> and support them on their patreon at <a href='https://www.patreon.com/thedatadb'>www.patreon.com/thedatadb</a></span><br/>
      </p>
    </div>,
    <div className='blurb'>
      <h4>The What</h4>
      <p>
        <span>myBarCart is a recipe generator.</span><br/>
        <span>Instead of looking up recipes, though, myBarCart shows you recipes based on the ingredients you have.</span><br/>
      </p>
    </div>,
    <div className='blurb'>
      <h4>The Why</h4>
      <p>
        <span>Short answer: Sometime you don't want to go to the store.</span><br/>
        <span>myBarCart giver you the option to make something without needing to go out for ingredients!</span><br/>
      </p>
    </div>,
    <div className='blurb'>
      <h4>The How</h4>
      <p>
        <span>-- In Development --</span><br/>
      </p>
    </div>
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