import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { getNewAlbums } from '@/api/recommend'
import ReactDom from 'react-dom'
import './index.css'
import Scroll from '@/common/Scroll'
import { filterSingers } from './config.js'
import Loading from '@/common/Loading'
// 通过查阅react-lazyload的github的使用说明，发现提供了一个forceCheck函数，当元素没有通过scroll或者resize事件加载时强制检查元素位置，这个时候如果出现在屏幕内就会被立即加载。借助Scroll组件暴露的onScroll属性就可以监听到Scroll组件的滚动
import LazyLoad, { forceCheck } from 'react-lazyload'
import AlbumInfo from '@/components/AlbumInfo'
import { Toast } from 'antd-mobile'
class Albums extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newAlbums: [],
      refreshScroll: false,
      loading: true
    }
  }

  // 获取新专辑数据源
  componentDidMount() {
    console.log('this.props', this.props)
    // 计算高度
    let winHeight = document.documentElement.clientHeight - 335 + 'px'
    ReactDom.findDOMNode(this.refs.scrollContainer).style.height = winHeight
    // 获取专辑列表数据源
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
    .catch(err => {
      this.setState({
        loading: false
      }, () => Toast.fail('数据连接超时，请重新连接...'))
    })
  }

  handlerClick(url) {
    return () => {
      this.props.route.history.push({pathname:url})
    }
  }

  render() {
    const {match} = this.props.route
    console.log('match', match)
    return (
      <div className="scroll-container" ref="scrollContainer">
        <h1 className="album-title">最新专辑</h1>
        <Scroll 
          refresh={this.state.refreshScroll}
          onScroll={() => forceCheck()}>
          <div className="new-albums" >
            {
              this.state.newAlbums.map(item => (
                <div className="album" key={item.album_id} onClick={this.handlerClick(`${match.url + '/' + item.album_mid}`)}>
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
        <Loading title="拼命加载中..." isShow={this.state.loading}></Loading>
        <Route path={`${match.url}/:id`} component={AlbumInfo}></Route>   
      </div>
    )
  }
}

export default Albums