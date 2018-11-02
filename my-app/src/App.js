import React, { Component } from 'react'
import './App.css'
import logo from '@/assets/imgs/logo.png'
import '@/assets/stylus/reset.styl'
import { Tabs, WhiteSpace  } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'

class App extends Component {

  render() {
    return (
      <div className= "App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt="logo"/>
          <h1 className="App-title">Mango Music</h1>
        </header>
        <div className="music-tab">
          <WhiteSpace />
          <StickyContainer>
            
          </StickyContainer>
        </div>
      </div>
    )
  }
}

export default App