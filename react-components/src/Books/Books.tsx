import React from 'react';
import Book from '../Book/Book';
import { data } from './mockData';
import './style.scss';

export default function Books(): JSX.Element {
  return (
    <main className="books">
      {
        data.map((book) => <Book {...book} key={book.name}/>)
      }
    </main>
  );
}
