import React, { Component } from 'react'
import './index.css'

class Player extends Component{

  componentDidMount() {
    console.log('this.props.player', this.props)
  }
  render() {
    return (
      <div className="player-container"></div>
    )
  }
}

export default Player