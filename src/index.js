import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client';

const socket = io(process.env.API_URL || 'http://localhost:3001');

socket.on('connect', onConnect);

function onConnect(){
  console.log('connect ' + socket.id);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
