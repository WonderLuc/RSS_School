import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  clearMistakes,
  saveStatistics,
  sendCorrectWord,
  sendWrongWord,
  updateStatistics,
} from '../../store/actions';
import { IWordStatistics } from '../../store/redux-types';
import './style.scss';

interface WordProps extends IWordStatistics {
  repeat?: boolean;
  handleRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  error?: React.RefObject<HTMLAudioElement>;
  success?: React.RefObject<HTMLAudioElement>;
  categoryName: string;
}

export default function Word(props: WordProps): JSX.Element {
  const [isFlipped, flippedChange] = useState(false);
  const [tries, setTries] = useState(0);
  const {
    playModeManageReducer: playState,
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

  const isSuccessed = !!gameState.succesfulyWords.filter((word) => word.word === props.word).length;

  function playAudio() {
    if (!isFlipped) {
      audio.current?.play();
    }
  }

  function handleMainClick() {
    if (!playState.isPlay) {
      playAudio();
      dispatch(updateStatistics(
        {
          categories: [
            {
              name: props.categoryName,
              words: [{
                word: props.word,
                translation: props.translation,
                image: props.image,
                audioSrc: props.audioSrc,
                trained: 1,
                tries: 0,
                succesfull: 0,
                categoryName: props.categoryName,
              }],
            },
          ],
        },
      ));
      dispatch(saveStatistics());
      return;
    }
    if (isSuccessed) {
      return;
    }
    if (isCurrent) {
      props.success?.current?.play();
      setTimeout(() => {
        const misclicks = gameState.mistakes + 1;
        setTries(misclicks);
        dispatch(clearMistakes());
        dispatch(sendCorrectWord(props));
        dispatch(updateStatistics(
          {
            categories: [
              {
                name: gameState.categoryName,
                words: [{
                  word: props.word,
                  translation: props.translation,
                  image: props.image,
                  audioSrc: props.audioSrc,
                  trained: 0,
                  tries: misclicks,
                  succesfull: 1,
                  categoryName: props.categoryName,
                }],
              },
            ],
          },
        ));
        dispatch(saveStatistics());
        props.handleRepeat(true);
      }, 700);
      return;
    }
    props.error?.current?.play();
    dispatch(sendWrongWord(props));
  }

  return (
    <div className={`word ${isFlipped ? 'flipped' : ''} ${playState.isPlay ? 'word_play' : ''}`}
      onMouseLeave={() => flippedChange(false)}
      onClick={handleMainClick}>
      <div className="word__front">
        <img className='word__image' src={`./${props.image}`} />
        {isSuccessed && <div className={`card-block ${tries <= 1 ? 'star-cool' : 'star-empty'}`}></div>}
        {!playState.isPlay
         && <h4 className="word__text">{props.word}</h4>}
        <audio ref={audio} src={`./${props.audioSrc}`}></audio>
        {!playState.isPlay
        && <button className="btn__translate" onClick={() => flippedChange(true)}>Translate!</button> }
        {isCurrent && props.repeat ? playAudio() : ''}
      </div>
      <div className="word__back">
        <img className="word__image" src={`./${props.image}`} />
        <h4 className="word__text">{props.translation}</h4>
      </div>
    </div>
  );
}
