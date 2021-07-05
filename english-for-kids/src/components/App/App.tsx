import React from 'react';
import {
  BrowserRouter, Switch, Route, Link,
} from 'react-router-dom';
import Category from '../Categoty/Category';
import Main from '../Main/Main';
import Header from '../Header/Header';

export default function App(): JSX.Element {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/'><Main/></Route>
          <Route path='/category'><Category /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
