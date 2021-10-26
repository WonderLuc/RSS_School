import React from 'react';
import { IWordStatistics } from '../../store/redux-types';

interface IRowProps {
  word: IWordStatistics;
}
export default function StatisticsRow(props: IRowProps): JSX.Element {
  const { word } = props;
  const percent = Math.round((word.succesfull / word.tries) * 100);
  return (<tr>
    <td>{word.categoryName}</td>
    <td>{word.word}</td>
    <td>{word.translation}</td>
    <td>{word.trained}</td>
    <td>{word.succesfull}</td>
    <td>{word.tries}</td>
    <td>{percent || 'No Data Yet'}</td>
  </tr>);
}
