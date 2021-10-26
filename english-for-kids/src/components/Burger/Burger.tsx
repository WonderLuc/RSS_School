import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './style.scss';

interface BurgerProps {
  onClick: React.MouseEventHandler;
}

export default function Burger(props: BurgerProps): JSX.Element {
  const { menuManageReducer: menuState } = useTypedSelector((store) => store);
  return (
    <div className={`burger ${menuState.isOpenNav ? 'burger_close' : ''}`}
      onClick={(e) => props.onClick(e)}>
      <div className="burger__line"></div>
      <div className="burger__line"></div>
      <div className="burger__line"></div>
    </div>);
}
