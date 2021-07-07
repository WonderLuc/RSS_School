import React, { useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IWord } from '../../store/redux-types';
import './style.scss';

export default function Word(props: IWord): JSX.Element {
  const [isFlipped, flippedChange] = useState(false);
  const {
    playModeManageReducer: playState,
  } = useTypedSelector((store) => store);

  return (
    <div className={`word ${isFlipped ? 'flipped' : ''} ${playState.isPlay ? 'word_play' : ''}`}
      onMouseLeave={() => flippedChange(false)}>
      <div className="word__front">
        <img className="word__image" src={props.image} />
        <h4 className="word__text">{props.word}</h4>
        <button className="btn__translate" onClick={() => flippedChange(true)}>Translate!</button>
      </div>
      <div className="word__back">
        <img className="word__image" src={props.image} />
        <h4 className="word__text">{props.translation}</h4>
      </div>
    </div>
  );
}
