import React from 'react';
import {
  Switch, Route, HashRouter,
} from 'react-router-dom';
import CategoryPage from '../CategotyPage/CategoryPage';
import Main from '../Main/Main';
import Header from '../Header/Header';
import '../../../assets_dev/colors.scss';
import './style.scss';
import Statistics from '../Statistics/Statistics';

export default function App(): JSX.Element {
  return (
    <div className='app'>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/category/:categoryName' component={CategoryPage}/>
          <Route path='/statistic/' component={Statistics} />
        </Switch>
      </HashRouter>
    </div>
  );
}
