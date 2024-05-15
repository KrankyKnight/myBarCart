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
  const pageMax = 3;
  let pageButtonClicked = false;

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

  const closeModal = () => {
    dispatch(modalOff());
    dispatch(changeHelpModalPage(0));
  };

  const pages = [
    <p className='blurb'>
      <h4>How To Use</h4>
      <div>MyBarCartDB's main focus is to see what you can make with what you have</div>
      <ol id='tutorial'>
        <li>1. Search for ingredients that you have by using the "Search Ingredient" field</li>
        <li>2. Click on ingredients to add them to your inventory</li>
        <li>3. Click "Generate Recipes" and see what you can make</li>
      </ol>
      <div>Enjoy!</div>
    </p>
  ]

  return(
    <>
      <div className={`info-modal ${currentPage}`}>
        {pages[currentPage]}
      </div>
      <div className="modal-overlay" onClick={closeModal}></div>
    </>
  );
};