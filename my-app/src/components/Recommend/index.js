import React, { Component } from 'react'
import './index.css'
import Carousel from '@/components/Carousel'

class Recommend extends Component {

  render () {
    return (
      <div className="recommend-music">
        <Carousel></Carousel>
      </div>
    )
  }
}

export default Recommend