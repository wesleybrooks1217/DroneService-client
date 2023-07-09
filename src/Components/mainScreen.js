import * as React from 'react';
import './App.css';
//import './WelcomeScreen.js';

const mainScreen = (props) => {
    console.log(props)
  return (
    <div>
    <h1>props.name</h1>
    <h2>props.role</h2>
    </div>
  );
}

export default mainScreen;