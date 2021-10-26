import React from 'react';
import './style.scss';

interface GameEndSmileProps {
  isWin: boolean;
}
export default function GameEndSmile(props: GameEndSmileProps): JSX.Element {
  return (
    <img className="game-end-smile" src={props.isWin ? './img/success.jpg' : './img/failure.jpg'} />
  );
}
