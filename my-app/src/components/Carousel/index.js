import React, { Component } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import { getCarousel } from '@/api/recommend.js'

class Carousel extends Component {
  constructor () {
    super ()
    this.state = {
      sliderList: []
    }
  }

  componentDidMount () {
    console.log(getCarousel().then())
  }
  render () {
    return (
      <div></div>
    )
  }
}

export default Carousel