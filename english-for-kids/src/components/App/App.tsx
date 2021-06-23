import React from 'react';

export default function App(): JSX.Element {
  const changeColor = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    e.currentTarget.style.color = 'red';
  };

  return (
    <div className="app">
      <h1 onClick={changeColor}>React Kids</h1>
    </div>
  );
}
