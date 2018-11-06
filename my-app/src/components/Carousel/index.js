import React, { Component } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.css'
import { getCarousel } from '@/api/recommend.js'

class Carousel extends Component {
  constructor () {
    super ()
    this.state = {
      sliderList: []
    }
  }

  // 获取轮播图数据源
  componentDidMount () {
    getCarousel()
      .then(res => {
        if (res.code === 0) {
          console.log(res)
          this.setState({
            sliderList: res.data.slider
          })
        }
      })
  }

  // new swiper
  componentDidUpdate() {
    if (this.swiper) {
      this.swiper.slideTo(0, 0)
      this.swiper.destroy()
    }
    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }

  componentWillUnmount() {
    this.swiper.destroy()
  }

  // 图片链接跳转
  jumpToLink(linkUrl) {
    /*使用闭包把参数变为局部变量使用*/
    return () => {
      window.location.href = linkUrl
    }
  }
  render () {
    return (
      <div className="music-recommend">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              this.state.sliderList.map(slider => (
        
                <div className="swiper-slide" key={slider.id} onClick={this.jumpToLink(slider.linkUrl)}>
                  <img className="swiper-img" src={slider.picUrl} alt="推荐"/>
                </div>
                
              ))
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

export default Carousel