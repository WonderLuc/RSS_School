import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { clearGame } from '../../store/actions';
import './style.scss';

interface NavProps {
  onClick: React.MouseEventHandler;
}

export default function Navigation(props: NavProps): JSX.Element {
  const dispatch = useDispatch();
  const { dataManageReducer: dataState, playModeManageReducer: playState } = useTypedSelector((store) => store);
  return (
    <ul className={`nav ${playState.isPlay ? 'nav_play' : ''}`}>
      <li className="nav__item" ><NavLink exact to='/' onClick={(e) => {
        props.onClick(e);
        dispatch(clearGame());
      }
      }>Main</NavLink></li>
      {dataState.categories.map((category) => {
        const key = `header-${category.name}`;
        return (
          <li className="nav__item" key={key} >
            <NavLink onClick={(e) => {
              props.onClick(e);
              dispatch(clearGame());
            }} to={`/category/${category.name}`} >{category.name}</NavLink>
          </li>);
      })}
      <li className="nav__item"><NavLink to='/statistic/' onClick={(e) => {
        props.onClick(e);
        dispatch(clearGame());
      }}>Statistics</NavLink></li>
    </ul>
  );
}
