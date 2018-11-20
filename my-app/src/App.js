import React, { Component } from 'react'
import './App.css'
import logo from '@/assets/imgs/logo.png'
import '@/assets/stylus/reset.styl'
import '@/assets/stylus/font.styl'
import MusicTab from '@/components/MusicTab'
import Player from './containers/Player'

class App extends Component {

  render() {
    return (
      <div className= "App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo"/>
          <h1 className="App-title">Mango Music</h1>
        </header>
        <MusicTab></MusicTab>
        <Player />
      </div>
    )
  }
}

export default App