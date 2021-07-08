import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { resetStatistics } from '../../store/actions';
import { IWordStatistics } from '../../store/redux-types';
import StatisticsRow from '../StatisticsRow/StatisticsRow';
import './style.scss';

let wordsArray: IWordStatistics[] = [];

export default function Statistics(): JSX.Element {
  const { staticticsManageReducer: statistics } = useTypedSelector((store) => store);
  const [direction, changeDirection] = useState(true);
  const dispatch = useDispatch();

  function currentStaticLength(): number {
    let currentLenght = 0;
    statistics.categories.forEach((cat) => {
      currentLenght += cat.words.length;
    });
    return currentLenght;
  }
  if (wordsArray.length !== currentStaticLength()) {
    statistics.categories.forEach((cat) => {
      cat.words.forEach((word) => {
        wordsArray.push(word);
      });
    });
  }
  function assingToWordArray(sorted: IWordStatistics[]): void {
    wordsArray = direction ? sorted : sorted.reverse();
    changeDirection(!direction);
  }
  function sortByString(
    stringName: 'word' | 'categoryName' | 'translation',
  ): void {
    const sorted = wordsArray.sort((a, b) => (a[stringName].toLowerCase() < b[stringName].toLowerCase() ? 1 : -1));
    assingToWordArray(sorted);
  }

  function sortByNumber(
    numberName: 'trained' | 'succesfull' | 'tries',
  ): void {
    const sorted = wordsArray.sort((a, b) => (a[numberName] < b[numberName] ? 1 : -1));
    assingToWordArray(sorted);
  }

  function sortByPercent(): void {
    const sorted = wordsArray.sort((a, b) => {
      const aPercent = (a.succesfull / a.tries) * 100;
      const bPercent = (b.succesfull / b.tries) * 100;
      if (!aPercent) return 1;
      if (!bPercent) return -1;
      return aPercent < bPercent ? 1 : -1;
    });
    assingToWordArray(sorted);
  }

  return (
    <div className="statistics">
      <div className="statistics__info">
        <h2 className="statistics__header">Statistics</h2>
        <button className="btn-reset"
          onClick={() => {
            localStorage.removeItem('statistics');
            dispatch(resetStatistics());
            assingToWordArray([]);
          }}
        >Reset</button>
      </div>
      <table className="table">
        <thead className="table__head">
          <tr>
            <td onClick={() => { sortByString('categoryName'); }}>Category</td>
            <td onClick={() => { sortByString('word'); }}>Word</td>
            <td onClick={() => { sortByString('translation'); }}>Translation</td>
            <td onClick={() => { sortByNumber('trained'); }}>Trained</td>
            <td onClick={() => { sortByNumber('succesfull'); }}>Success</td>
            <td onClick={() => { sortByNumber('tries'); }}>Tries</td>
            <td onClick={() => { sortByPercent(); }}>%</td>
          </tr>
        </thead>
        <tbody className="table__body">
          {wordsArray.map((word) => <StatisticsRow word={word} key={`${word.word}-${word.categoryName}`} />)}
        </tbody>
      </table>
    </div>
  );
}
