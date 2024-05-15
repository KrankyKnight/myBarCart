/**
 * @description Top level container for application
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { modalOn, changeHelpModalPage } from '../../actions'
import './styles.scss';

export const HelpModalButton = () => {

  const dispatch = useDispatch();

  const openHelpModal = () => {
    dispatch(modalOn('help'));
    dispatch(changeHelpModalPage(0));
  };

  return(
    <div id='info-button' onClick={openHelpModal}>
      ?
    </div>
  );
};