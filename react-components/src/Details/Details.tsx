import React from 'react';
import { IBook } from '../Books/mockData';
import './style.scss';

export type DetailType = 'price' | 'comments' | 'likes';
interface DetailsProps extends IBook{
  detail: DetailType;
}
export default function Details(props: DetailsProps): JSX.Element {
  return (
    <figure className={props.detail}>
      <img className={`${props.detail}__img`} src={`./assets/${props.detail}.png`}/>
      <figcaption>{props[props.detail]}</figcaption>
    </figure>
  );
}
