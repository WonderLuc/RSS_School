import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { closeMenu, openMenu } from '../../store/actions';
import Burger from '../Burger/Burger';
import Navigation from '../Navigation/Navigation';
import './style.scss';

export default function Header(): JSX.Element {
  const { playModeManageReducer: playState, menuManageReducer: menuState } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  const toggleOpenMenu = () => {
    if (menuState?.isOpenNav) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  };
  return (
    <header className={`header 
                        ${playState.isPlay ? 'header_play' : ''} 
                        ${menuState.isOpenNav ? 'header_open' : ''}`}>
      <Burger onClick={toggleOpenMenu}/>
      {menuState.isOpenNav && <Navigation onClick={toggleOpenMenu}/>}
    </header>
  );
}
