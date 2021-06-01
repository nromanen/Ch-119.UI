import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Map} from './components/Map/Map';
import {Login} from './components/Login/Login';
/**
 * @return {Object}
 */
function App() {
  return (
    <div className="App">
      <Map></Map>
      <Login />
    </div>
  );
}

export default App;
