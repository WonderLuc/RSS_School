import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { playModeOff, playModeOn } from '../../store/actions';
import './style.scss';

export default function PlaySwitcher(): JSX.Element {
  const { playModeManageReducer: playState } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  function tooglePlayMode() {
    if (playState.isPlay) {
      dispatch(playModeOff());
    } else {
      dispatch(playModeOn());
    }
  }

  return (
    <div className={`switcher ${playState.isPlay ? 'switcher_play' : ''}`}
      onClick={tooglePlayMode}>
      <p className="switcher__text">{playState.isPlay ? 'Play' : 'Train'}</p>
      <div className="switcher__point"></div>
    </div>
  );
}
