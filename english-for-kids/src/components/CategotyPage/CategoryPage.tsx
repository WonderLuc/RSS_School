import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { closeMenu } from '../../store/actions';
import PlaySwitcher from '../PlaySwitcher/PlaySwitcher';
import Word from '../Word/Word';
import './style.scss';

type ParamsRoute = { categoryName: string };

function CategoryPage(props: RouteComponentProps<ParamsRoute>): JSX.Element {
  const {
    dataManageReducer: dataState,
    menuManageReducer: menuState,
    playModeManageReducer: playState,
  } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  const { words } = dataState.categories.filter(
    (category) => category.name === props.match.params.categoryName,
  )[0];
  function closeOpenMenu() {
    if (menuState.isOpenNav) {
      dispatch(closeMenu());
    }
  }

  return (
    <div className={`category ${playState.isPlay ? 'category_play' : ''}`} onClick={closeOpenMenu}>
      <PlaySwitcher />
      <h2 className="category__name">{props.match.params.categoryName}</h2>
      <div className="words">
        {words.map((word) => <Word {...word} key={word.word}/>)}
      </div>
    </div>
  );
}

export default CategoryPage;
