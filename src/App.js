import React from 'react';
import CalculatorBase from './containers/CalculatorBase'
import './App.css';

function App() {
  return (
    <div className="calculator-root">
      <div className="calculator-main">
        <CalculatorBase />
      </div>
    </div>
  );
}

export default App;
