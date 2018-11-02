import React, { Component } from 'react'
import './App.css'
import logo from '@/assets/imgs/logo.png'
import '@/assets/stylus/reset.styl'
import MusicTab from '@/components/MusicTab'

class App extends Component {

  render() {
    return (
      <div className= "App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo"/>
          <h1 className="App-title">Mango Music</h1>
        </header>
        <MusicTab></MusicTab>
      </div>
    )
  }
}

export default App