import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { dataEnd, getData } from '../../store/actions';
import CategoryCard from '../CategotyCard/CategoryCard';
import Download from '../Download/Download';
import PlaySwitcher from '../PlaySwitcher/PlaySwitcher';
import './style.scss';

function Main(): JSX.Element {
  const { dataManageReducer: dataState } = useTypedSelector((store) => store);
  const dispatch = useDispatch();
  const changeColor = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    const bol = dataState.loading ? dispatch(dataEnd()) : dispatch(getData());
    e.currentTarget.style.color = dataState.loading ? 'black' : 'red';
  };

  return (
    <main className="main">
      <PlaySwitcher />
      {dataState.loading && <Download />}
      <h2 onClick={changeColor}>Main Page</h2>
      <div className="categories">
        {dataState.categories.map((category) => <CategoryCard {...category}
          key={category.name} />)}
      </div>
    </main>
  );
}

export default Main;
