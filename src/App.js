import React from 'react';
import './App.scss';
import ItemTable from './components/ItemTable'
import BarcodeInput from './components/BarcodeInput'
import User from './components/User'

function App() {
  return (
    <div className="App">
      <User />
      <BarcodeInput />
      <ItemTable />
    </div>
  );
}

export default App;
