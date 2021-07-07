import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sendCorrectWord, sendWrongWord, updateGame } from '../../store/actions';
import { IWord, IWordStatistics } from '../../store/redux-types';
import './style.scss';

interface WordProps extends IWordStatistics {
  repeat?: boolean;
  handleRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  error?: React.RefObject<HTMLAudioElement>;
  success?: React.RefObject<HTMLAudioElement>;
}

export default function Word(props: WordProps): JSX.Element {
  const [isFlipped, flippedChange] = useState(false);
  const {
    playModeManageReducer: playState,
    staticticsManageReducer: statistics,
    gameManageReducer: gameState,
  } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  const audio = useRef<HTMLAudioElement>(null);
  const isCurrent = gameState.words[0]?.word === props.word;
  useEffect(() => {
    if (props.repeat) {
      props.handleRepeat(false);
    }
  });

  function playAudio() {
    if (!isFlipped) {
      audio.current?.play();
    }
  }

  function handleMainClick() {
    if (!playState.isPlay) {
      playAudio();
      return;
    }
    if (isCurrent) {
      props.success?.current?.play();
      setTimeout(() => {
        dispatch(sendCorrectWord(props));
        props.handleRepeat(true);
      }, 700);
      return;
    }
    props.error?.current?.play();
    dispatch(sendWrongWord(props));
  }

  const isSuccessed = !!gameState.succesfulyWords.filter((word) => word.word === props.word).length;

  return (
    <div className={`word ${isFlipped ? 'flipped' : ''} ${playState.isPlay ? 'word_play' : ''}`}
      onMouseLeave={() => flippedChange(false)}
      onClick={handleMainClick}>
      <div className="word__front">
        <img className='word__image' src={`../${props.image}`} />
        {isSuccessed && <div className="card-block"></div>}
        {!playState.isPlay
         && <h4 className="word__text">{props.word}</h4>}
        <audio ref={audio} src={`../${props.audioSrc}`}></audio>
        {!playState.isPlay
        && <button className="btn__translate" onClick={() => flippedChange(true)}>Translate!</button> }
        {isCurrent && props.repeat ? playAudio() : ''}
      </div>
      <div className="word__back">
        <img className="word__image" src={`../${props.image}`} />
        <h4 className="word__text">{props.translation}</h4>
      </div>
    </div>
  );
}
