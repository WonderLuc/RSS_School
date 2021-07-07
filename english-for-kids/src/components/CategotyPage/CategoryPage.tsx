import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { clearGame, closeMenu, updateGame } from '../../store/actions';
import { IWord, IWordStatistics } from '../../store/redux-types';
import GameEndSmile from '../GameEndSmile/GameEndSmile';
import PlaySwitcher from '../PlaySwitcher/PlaySwitcher';
import Word from '../Word/Word';
import './style.scss';

type ParamsRoute = { categoryName: string };

// Takes Fisher–Yates shuffle from learn.javascript
function shuffle(array: IWordStatistics[]): IWordStatistics[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function CategoryPage(props: RouteComponentProps<ParamsRoute>): JSX.Element {
  const {
    dataManageReducer: dataState,
    menuManageReducer: menuState,
    playModeManageReducer: playState,
    staticticsManageReducer: statistics,
    gameManageReducer: gameState,
  } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  const error = useRef<HTMLAudioElement>(null);
  const success = useRef<HTMLAudioElement>(null);
  const { words: iWords } = dataState.categories.filter(
    (category) => category.name === props.match.params.categoryName,
  )[0];
  const words: IWordStatistics[] = iWords.map((word: IWord) => ({
    ...word, tries: 0, trained: 0, succesfull: 0,
  }));
  const [needRepeat, reapeatState] = useState(false);
  function closeOpenMenu() {
    if (menuState.isOpenNav) {
      dispatch(closeMenu());
    }
  }
  function startGame() {
    dispatch(updateGame({
      isFinished: false,
      categoryName: props.match.params.categoryName,
      words: shuffle(words),
      succesfulyWords: [],
      mistakes: 0,
    }));
    reapeatState(true);
  }
  function handleGameActionBtnClick() {
    if (gameState.isFinished) {
      startGame();
    } else {
      reapeatState(true);
    }
  }

  function endGame(): JSX.Element | null {
    if (!gameState.succesfulyWords.length) {
      return null;
    }
    const percentToWin = (gameState.mistakes * 100) / gameState.succesfulyWords.length;
    const sound = document.createElement('audio');
    let isWin;
    if (percentToWin < 40) {
      sound.src = '../audio/success.mp3';
      isWin = true;
    } else {
      sound.src = '../audio/failure.mp3';
      isWin = false;
    }
    sound.play();
    setTimeout(() => {
      dispatch(clearGame());
    }, 5000);
    return <GameEndSmile isWin={isWin}/>;
  }

  const wordComponents = words.map((word) => <Word repeat={ needRepeat }
    handleRepeat={reapeatState}
    {...word}
    key={word.word}
    error = {error}
    success = { success }/>);

  return (
    <div className={`category ${playState.isPlay ? 'category_play' : ''}`} onClick={closeOpenMenu}>
      <PlaySwitcher />
      <h2 className="category__name">{props.match.params.categoryName}</h2>
      <div className="words">
        {wordComponents}
      </div>
      {playState.isPlay
      && <button className="btn_gameActions" onClick={handleGameActionBtnClick}>
        {gameState.isFinished ? 'Play!' : 'Repeat'}
      </button>}
      {gameState.isFinished ? '' : <audio ref={error} src="../audio/error.mp3" /> }
      {gameState.isFinished ? '' : <audio ref={success} src="../audio/correct.mp3" />}
      {playState.isPlay && gameState.isFinished && endGame()}
    </div>
  );
}

export default CategoryPage;
