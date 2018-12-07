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
    this.playModels = ['list', 'single', 'shuffle']

    this.state = {
      currentTime: 0,
      playProgress: 0,
      playStatus: false,
      currentPlayModel: 0
    }
  }

  componentDidMount() {
    console.log('this.props.player', this.props)
    this.playerDOM = ReactDOM.findDOMNode(this.refs.player)
    this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg)
    this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg)
    this.audioDOM = ReactDOM.findDOMNode(this.refs.audio)
  }
  render() {
    let song = this.currentSong
    let playBg = song.img ? song.img : require('@/assets/imgs/play_bg.jpg')
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
                <div className="play-model-button"></div>
                <div className="play-previous-button"></div>
                <div className="play-button"></div>
                <div className="play-next-button"></div>
                <div className="play-list-button"></div>
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