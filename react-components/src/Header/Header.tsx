import React from 'react';
import Search from '../Search/Search';
import './style.scss';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <Search />
    </header>
  );
}
