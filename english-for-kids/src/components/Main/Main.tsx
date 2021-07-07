import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { closeMenu, dataEnd, getData } from '../../store/actions';
import CategoryCard from '../CategotyCard/CategoryCard';
import Download from '../Download/Download';
import PlaySwitcher from '../PlaySwitcher/PlaySwitcher';
import './style.scss';

function Main(): JSX.Element {
  const { dataManageReducer: dataState, menuManageReducer: menuState } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  function closeOpenMenu() {
    if (menuState.isOpenNav) {
      dispatch(closeMenu());
    }
  }
  return (
    <main className="main" onClick={closeOpenMenu}>
      <PlaySwitcher />
      <div className="categories">
        {dataState.categories.map((category) => <CategoryCard {...category}
          key={category.name} />)}
      </div>
    </main>
  );
}

export default Main;
