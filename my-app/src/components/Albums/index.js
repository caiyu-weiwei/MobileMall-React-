import React, { Component } from 'react'
import { getNewAlbums } from '@/api/recommend'
import ReactDom from 'react-dom'
import './index.css'
import Scroll from '@/common/Scroll'
import { filterSingers } from './config.js'
import Loading from '@/common/Loading'
// 通过查阅react-lazyload的github的使用说明，发现提供了一个forceCheck函数，当元素没有通过scroll或者resize事件加载时强制检查元素位置，这个时候如果出现在屏幕内就会被立即加载。借助Scroll组件暴露的onScroll属性就可以监听到Scroll组件的滚动
import LazyLoad, { forceCheck } from 'react-lazyload'
class Albums extends Component {
  constructor() {
    super()
    this.state = {
      newAlbums: [],
      refreshScroll: false,
      loading: true
    }
  }

  // 获取新专辑数据源
  componentDidMount() {
    let winHeight = document.documentElement.clientHeight - 335 + 'px'
    ReactDom.findDOMNode(this.refs.scrollContainer).style.height = winHeight
    getNewAlbums()
    .then(res => {
      console.log(res)
      if (res.albumlib.code === 0) {
        let albumsList = res.albumlib.data.list
        albumsList.sort((a, b) => {
          return new Date(b.public_time).getTime() - new Date(a.public_time).getTime()
        })
        this.setState({
          newAlbums: albumsList,
          loading: false
        }, () => {
          this.setState({
            refreshScroll: true
          })
        })
      }
      
    })
  }

  render() {
    return (
      <div className="scroll-container" ref="scrollContainer">
        <h1 className="album-title">最新专辑</h1>
        <Scroll 
          refresh={this.state.refreshScroll}
          onScroll={() => forceCheck()}>
          <div className="new-albums" >
            {
              this.state.newAlbums.map(item => (
                <div className="album" key={item.album_id}>
                  <LazyLoad>
                    <div className="album-img">
                      <img src={`http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`} alt="专辑"/>
                    </div>
                  </LazyLoad>
                  <div className="album-text">
                    <div className="album-name">{item.album_name}</div>
                    <div className="singer-name">{filterSingers(item.singers)}</div>
                    <div className="public-time">{item.public_time}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </Scroll>
        <Loading isShow={this.state.loading}></Loading>
      </div>
    )
  }
}

export default Albums