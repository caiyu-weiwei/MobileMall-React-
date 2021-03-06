import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { getAlbumInfo } from '@/api/recommend.js'
import Header from '@/common/Header'
import Loading from '@/common/Loading'
import { filterSingers } from './config.js'
import player from './player.png'
import Scroll from '@/common/Scroll'
import {CSSTransition} from "react-transition-group"
import { getSongVKey } from '@/api/song.js'
import { getTransitionEndName } from '@/utils/event.js'
import './index.css'

class AlbumInfo extends Component{

  constructor(props) {
    super(props)
    this.state = {
      albumInfo: {},
      loading: true,
      show: false,
      refresh: false
    }
    this.musicIcon = require('@/assets/imgs/music.svg')
  }
  /**
   * 获取专辑详情的数据源
   */
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
        // console.log('专辑详情', res)
        if (res && res.code === 0) {
          this.initMusicIcon()
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

  /**
   * 监听滚动
   */
  scroll = ({y}) => {
    let albumImg = ReactDOM.findDOMNode(this.refs.albumImg)
    let ablumCover = ReactDOM.findDOMNode(this.refs.ablumCover)

    if (y < 0) {
      let opacity = Math.abs(y) / albumImg.offsetHeight
      ablumCover.style.opacity = opacity
    } else {
      let scale = `scale(${1 + y*.004}, ${1 + y*.004})`
      albumImg.style['transform'] = scale
      albumImg.style['webkitTransform'] = scale
    }
  }

  /**
   * 获取歌曲vkey
   */
  getSongUrl = (song, mId) => {
    getSongVKey(mId)
      .then(res => {
        // console.log(res)
      })
  }

  /**
   * 选择歌曲
   */
  selectSong = song =>{
    return (e) => {
      // console.log(this.props)
      // console.log('song', song)
      this.props.changeSong(song)
      this.props.setSongs([song])
      // console.log('selectSong', this.props)
      this.startMusicIconAnimation(e.nativeEvent)
    }
  }

  /**
   * 播放全部
   */
  playAll = () => {
    // console.log('播放全部')
    // console.log('this.state.albumInfo', this.state.albumInfo)
    if (this.state.albumInfo.list.length) {
      this.props.showPlayer(true)
      this.props.changeSong(this.state.albumInfo.list[0])
      this.props.setSongs(this.state.albumInfo.list)
    }
  }

  /**
   * 音符初始化
   */
  initMusicIcon = () => {
    this.musicIcons = []
    this.musicIcons.push(ReactDOM.findDOMNode(this.refs.musicIcon1))
    this.musicIcons.push(ReactDOM.findDOMNode(this.refs.musicIcon2))
    this.musicIcons.push(ReactDOM.findDOMNode(this.refs.musicIcon3))
    this.musicIcons.map(item => {
      item.run = false
      let transitionEndName = getTransitionEndName(item)

      item.addEventListener(transitionEndName, () => {

        item.run = false
        item.style['transform'] = 'translate3d(0, 0, 0)'
        item.style['webkitTransform'] = 'translate3d(0, 0, 0)'
        item.style.display = 'none'
        let icon = item.querySelector('div')
        icon.style['transform'] = 'translate3d(0, 0 ,0)'
        icon.style['webkitTransform'] = 'translate3d(0, 0 ,0)'
      })
    })
  }
  /**
   * 音符开始动画
   */
  startMusicIconAnimation = ({clientX, clientY}) => {
    if (this.musicIcons.length) {
      for (let i = 0, len = this.musicIcons.length; i < len; i++) {
        let item = this.musicIcons[i]
        if (!item.run) {
          item.style.top = clientY + 'px'
          item.style.left = clientX + 'px'
          item.style.display = 'inline-block'
          setTimeout(() => {
            item.run = true
            item.style['transform'] = 'translate3d(0, 1000px, 0)'
            item.style['webkitTransform'] = 'translate3d(0, 1000px, 0)'
            let icon = item.querySelector('div')
            icon.style['transform'] = 'translate3d(-30px, 0, 0)'
            icon.style['webkitTransform'] = 'translate3d(-30px, 0, 0)'
          }, 20)
          break
        }
      }
    }
  }

  render() {
    let albumInfo = this.state.albumInfo
    // console.log('albumInfo', this.state.albumInfo)
    // console.log('list', this.state.albumInfo.list)
    if (albumInfo && albumInfo.list) {
      this.songs = albumInfo.list.map(song => (
        <div className="song-list" key={song.songmid} onClick={this.selectSong(song)}>
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
            <div className="player-container" ref="playerContainer" onClick={this.playAll}>
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
          <div className="music-ico" ref="musicIcon1">
            <div>
              <img src={this.musicIcon} alt=""/>
            </div>
          </div>
          <div className="music-ico" ref="musicIcon2">
            <div>
              <img src={this.musicIcon} alt=""/>
            </div>
          </div>
          <div className="music-ico" ref="musicIcon3">
            <div>
              <img src={this.musicIcon} alt=""/>
            </div>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default AlbumInfo