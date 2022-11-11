import React from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { config } from '../config';

initializeApp(config.firebaseConfig);

const App = (): JSX.Element => {
  return (
    <div>
      App
    </div>
  );
}

export default App;
