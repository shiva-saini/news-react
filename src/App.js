
import './App.css';

import React, { Component } from 'react'
import NavBar from './elements/NavBar';
import News from './elements/News';

export default class App extends Component {
 
  render() {
    return (
      <div>
        <NavBar/>
        <News pageSize = {8} country = "in" category="sports"/>
        
      </div>
    )
  }
}

