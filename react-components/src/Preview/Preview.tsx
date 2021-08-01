import React from 'react';
import { IBook } from '../Books/mockData';
import './style.scss';

export default function Preview(props: IBook): JSX.Element {
  return (
    <figure className="preview">
      <img className="preview__img" src={`./assets/${props.img}`} />
      <h3 className="preview__name">{props.name}</h3>
      <h3 className="preview__author">{props.author}</h3>
    </figure>
  );
}
