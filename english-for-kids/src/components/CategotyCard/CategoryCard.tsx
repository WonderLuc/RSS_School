import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ICategory } from '../../store/redux-types';
import './style.scss';

export default function CategoryCard(props: ICategory): JSX.Element {
  const { playModeManageReducer: playState } = useTypedSelector((store) => store);
  const history = useHistory();
  const moveToCategory = () => {
    history.push(`/category/${props.name}`);
  };

  return (<article className={`category-card ${playState.isPlay ? 'category-card_play' : ''}`} onClick={moveToCategory}>
    <figure className="category-image-container">
      <img className="category-image" src={props.words[0]?.image} width="100px" height="100px"/>
    </figure>
    <div className="category-name-container">
      <h3 className="category-name">{props.name}</h3>
    </div>
  </article>);
}
