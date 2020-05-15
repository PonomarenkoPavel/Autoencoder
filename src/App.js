import React from 'react';
import './App.css';
import { StartPage } from './components/pages/StartPage';
import { CreateNNComponent } from './components/CreateNNComponent';
import { NNComponent } from './components/NNComponent';

function App() {
  return (
    <div className="App">
      <NNComponent />
    </div>
  );
}

export default App;
