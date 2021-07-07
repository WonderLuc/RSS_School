import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './style.scss';

interface NavProps {
  onClick: React.MouseEventHandler;
}

export default function Navigation(props: NavProps): JSX.Element {
  const { dataManageReducer: dataState, playModeManageReducer: playState } = useTypedSelector((store) => store);
  return (
    <ul className={`nav ${playState.isPlay ? 'nav_play' : ''}`}>
      <li className="nav__item" ><NavLink exact to='/' onClick={(e) => props.onClick(e)}>Main</NavLink></li>
      {dataState.categories.map((category) => {
        const key = `header-${category.name}`;
        return (
          <li className="nav__item" key={key} >
            <NavLink onClick={(e) => props.onClick(e)} to={`/category/${category.name}`} >{category.name}</NavLink>
          </li>);
      })}
    </ul>
  );
}
