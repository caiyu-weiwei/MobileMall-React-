import React, { Component } from 'react'
import './index.css'
import Carousel from '@/components/Carousel'
import Albums from '@/components/Albums'

class Recommend extends Component {

  render () {
    return (
      <div className="recommend-music">
        <Carousel></Carousel>
        <Albums></Albums>
      </div>
    )
  }
}

export default Recommend