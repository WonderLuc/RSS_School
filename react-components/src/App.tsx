import React from 'react';
import Books from './Books/Books';
import Header from './Header/Header';
import './style.scss';

export default function App(): JSX.Element {
  return (<div className="App">
    <Header />
    <Books />
  </div>);
}
