import React, { Component } from 'react'
import './index.css'
import Carousel from '@/components/Carousel'
import Albums from '@/components/Albums'

class Recommend extends Component {

  componentDidMount() {
    console.log('this.props', this.props)
  }
  render () {
    return (
      <div className="recommend-music">
        <Carousel></Carousel>
        <Albums route={this.props}></Albums>
      </div>
    )
  }
}

export default Recommend