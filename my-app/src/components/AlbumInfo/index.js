import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { getAlbumInfo } from '@/api/recommend.js'
import Header from '@/common/Header'
import Loading from '@/common/Loading'
import { filterSingers } from './config.js'
import player from './player.png'
import Scroll from '@/common/Scroll'
import {CSSTransition} from "react-transition-group"
import './index.css'

class AlbumInfo extends Component{

  constructor() {
    super()
    this.state = {
      albumInfo: {},
      loading: true,
      show: false,
      refresh: false
    }
  }
  // 获取专辑详情的数据源
  componentDidMount() {
    this.setState({
      show: true
    })
    let albumImg = ReactDOM.findDOMNode(this.refs.albumImg)
    let playerContainer = ReactDOM.findDOMNode(this.refs.playerContainer)
    let albumScroll = ReactDOM.findDOMNode(this.refs.albumScroll)
    playerContainer.style.top = albumImg.offsetHeight - playerContainer.offsetHeight - 25 + 'px'
    albumScroll.style.top = albumImg.offsetHeight + 55 + 'px'
    getAlbumInfo(this.props.match.params.id)
      .then(res => {
        console.log(res)
        if (res && res.code === 0) {
          this.setState({
            albumInfo : res.data
          }, () => {
            this.setState({
              loading: false,
              refresh: true
            })
          })
        }
      })
  }

  scroll = ({y}) => {
    let albumImg = ReactDOM.findDOMNode(this.refs.albumImg)
    let ablumCover = ReactDOM.findDOMNode(this.refs.ablumCover)

    if (y < 0) {
      let opacity = Math.abs(y) / albumImg.offsetHeight
      ablumCover.style.opacity = opacity
    }
  }

  render() {
    let albumInfo = this.state.albumInfo
    console.log('albumInfo', this.state.albumInfo)
    console.log('list', this.state.albumInfo.list)
    if (albumInfo && albumInfo.list) {
      this.songs = albumInfo.list.map(song => (
        <div className="song-list" key={song.songmid}>
          <div className="song-name">{song.albumname}</div>
          <div className="song-singer">{filterSingers(song.singer)}</div>
        </div>
      ))
    }
    
    return(
      <CSSTransition in={this.state.show} timeout={300} classNames="translate">
        <div className="album-container">
          <Header headerTitle={albumInfo.name} ref="header"></Header>
          <div className="album-wrapper">
            <div className="album-img" ref="albumImg">
              <img src={`http://y.gtimg.cn/music/photo_new/T002R300x300M000${albumInfo.mid}.jpg?max_age=2592000`} alt="专辑"/>
              <div className="album-cover" ref="ablumCover"></div>
            </div>
            <div className="player-container" ref="playerContainer">
              <div className="album-player">
                <img src={player} alt="播放"/>
                <span>播放全部</span>
              </div>
            </div>
            <div className="album-scroll" ref="albumScroll" style={this.state.loading ? {display: 'none'} : {display: 'block'}}>
              <Scroll onScroll={this.scroll} refresh={this.state.refresh}>
                <div className="album-brief">
                  <div className="album-songs">
                    <div className="album-num">
                      <span>专辑</span>
                      <span>共{albumInfo.total_song_num}首</span>
                    </div>
                    <div>{this.songs}</div>
                  </div>
                  <div className="album-describe">
                    <h2>专辑简介</h2>
                    <div className="album-content">
                      {albumInfo.desc}
                    </div>
                  </div>
                </div>
              </Scroll>
            </div>
          </div>
          <Loading isShow={this.state.loading} title="拼命加载中..."></Loading>
        </div>
      </CSSTransition>
    )
  }
}

export default AlbumInfo