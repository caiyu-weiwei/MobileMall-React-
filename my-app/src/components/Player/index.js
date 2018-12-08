import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ProgressBar from '@/components/ProgressBar'
import { Song } from '@/model/song.js'
import './index.css'

class Player extends Component{

  constructor(props) {
    super(props)

    /**
     * new 一个当前的歌曲
     */
    this.currentSong = new Song(0, '', '', '', 0, '', '')
    this.currentIndex = 0

    /**
     * 播放模式 list - 列表播放 single - 单曲播放  shuffle - 随机播放
     */
    this.playModels = [require('@/assets/imgs/list.svg'), require('@/assets/imgs/single.svg'), require('@/assets/imgs/shuffle.svg')]

    this.state = {
      currentTime: 0,
      playProgress: 0,
      playStatus: false,
      currentPlayModel: 0
    }
    this.playSvg = require('@/assets/imgs/play.svg')
    this.pauseSvg = require('@/assets/imgs/pause.svg')
    this.playOrPauseSvg = this.playSvg
    this.playModelSvg = require('@/assets/imgs/list.svg')
    this.currentPlayModel = 0
  }

  componentDidMount() {
    console.log('this.props.player', this.props)
    this.playerDOM = ReactDOM.findDOMNode(this.refs.player)
    this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg)
    this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg)
    this.audioDOM = ReactDOM.findDOMNode(this.refs.audio)
  }

  /**
   * 播放或暂停
   */
  playOrPause = () => {
    if (!this.state.playStatus) {
      this.playOrPauseSvg = this.pauseSvg
      this.setState({
        playStatus: true
      })
      this.startImgRotate()
    } else {
      this.playOrPauseSvg = this.playSvg
      this.setState({
        playStatus: false
      })
      this.stopImgRotate()
    }
  }

  /**
   * 播放模式切换
   */
  switchPlayModel = () => {
    this.currentPlayModel++
    if (this.currentPlayModel > 2) {
      this.currentPlayModel = 0
    }
    this.setState({
      currentPlayModel: this.currentPlayModel
    })
  }

  /**
   * 开始旋转图片
   */
  startImgRotate = () => {
    console.log('className', this.singerImgDOM.className)
    console.log('className', typeof this.singerImgDOM.className)
    console.log('classList', this.singerImgDOM.classList)
    if (this.singerImgDOM.className.indexOf('rotate') === -1) {
      this.singerImgDOM.classList.add('rotate')
    } else {
      this.singerImgDOM.style['animation-play-state'] = 'running'
      this.singerImgDOM.style['-webkit-animation-play-state'] = 'running'
    }
  }

  /**
   * 停止旋转图片
   */
  stopImgRotate = () => {
    this.singerImgDOM.style['animation-play-state'] = 'paused'
    this.singerImgDOM.style['-webkit-animation-play-state'] = 'paused'
  }

  render() {
    let song = this.currentSong
    let playBg = song.img ? song.img : require('@/assets/imgs/play_bg.jpg')
    let previousSvg = require('@/assets/imgs/previous.svg')
    
    let nextSvg = require('@/assets/imgs/next.svg')
    let listPlaySvg = require('@/assets/imgs/list_play.svg')
    console.log('playBg', playBg)
    return (
      <div className="player-box">
        <div className="player" ref="player">
          <div className="singer-middle">
            <div className="singer-img" ref="singerImg">
              <img src={playBg} alt={song.name} onLoad={
                () => {this.playerBgDOM.style.backgroundImage = `url("${playBg}")`}
              }/>
            </div>
          </div>

          <div className="singer-bottom">
            <div className="controller-wrapper">
              <div className="progress-wrapper">
                <span className="current-time">{'00: 00'}</span>
                <div className="play-progress">
                  <ProgressBar progress={.4}></ProgressBar>
                </div>
                <span className="total-time">{'05.00'}</span>
              </div>

              <div className="play-wrapper">
                <div className="play-model-button" onClick={this.switchPlayModel}>
                  <img src={this.playModels[this.state.currentPlayModel]} alt="播放模式"/>
                </div>
                <div className="play-previous-button">
                  <img src={previousSvg} alt=""/>
                </div>
                <div className="play-button" onClick = {this.playOrPause}>
                  <img src={this.playOrPauseSvg} alt=""/>
                </div>
                <div className="play-next-button">
                  <img src={nextSvg} alt=""/>
                </div>
                <div className="play-list-button">
                  <img src={listPlaySvg} alt=""/>
                </div>
              </div>
            </div>
          </div>

          <div className="player-bg" ref="playerBg"></div>
          
          <audio ref="audio"></audio>
        </div>
      </div>
    )
  }
}

export default Player