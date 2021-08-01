import React from 'react';
import './style.scss';

export default function Search(): JSX.Element {
  return (
    <div className="search">
      <img className="search__icon" src="./assets/search.png" alt="search icon"/>
      <input className="search__field" type="text" placeholder="Find a book" />
      <button className="search__button">Search</button>
    </div>
  );
}
