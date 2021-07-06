import React from 'react';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CategoryPage from '../CategotyPage/CategoryPage';
import Main from '../Main/Main';
import Header from '../Header/Header';

export default function App(): JSX.Element {
  const state = useTypedSelector((store) => store);
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/category/:categoryName' component={CategoryPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
