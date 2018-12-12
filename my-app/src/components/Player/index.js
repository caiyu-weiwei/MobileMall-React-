import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import ProgressBar from '@/components/ProgressBar'
import { Song } from '@/model/song.js'
import './index.scss'

class Player extends Component{

  constructor(props) {
    super(props)

    /**
     * new 一个当前的歌曲
     */
    this.currentSong = {}
    this.currentIndex = 0
    /**
     * 拖拽进度
     */
    this.dragProgress = 0

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
    this.playerBoxDOM = ReactDOM.findDOMNode(this.refs.playerBox)
    this.playerDOM = ReactDOM.findDOMNode(this.refs.player)
    this.singerImgDOM = ReactDOM.findDOMNode(this.refs.singerImg)
    this.playerBgDOM = ReactDOM.findDOMNode(this.refs.playerBg)
    this.audioDOM = ReactDOM.findDOMNode(this.refs.audio)

    /**
     * 当浏览器可以播放音频/视频时
     */
    this.audioDOM.addEventListener('canplay', () => {
      console.log('canplay', this.props)
      this.audioDOM.play()
      this.startImgRotate()
      this.setState({
        playStatus: true
      })
    })

    /**
     * 当目前的播放位置已更改时
     */
    this.audioDOM.addEventListener('timeupdate', () => {
      console.log(333333333333)
      console.log('timeupdate', this.audioDOM)
      console.log('currentTime', this.audioDOM.currentTime)
      console.log('duration', this.audioDOM.duration)
      if (this.state.playStatus) {
        this.setState({
          currentTime: this.audioDOM.currentTime,
          playProgress: this.audioDOM.currentTime / this.audioDOM.duration
        })
      }
    })

    /**
     * 当目前的播放已结束时
     */
    this.audioDOM.addEventListener('ended', () => {
      
      if (this.props.songs.length > 1) {
        let currentIndex = this.currentIndex
        let songsLength = this.props.songs.length 
        /**
         * 列表播放模式
         */
        if (this.state.currentPlayModel === 0) {
          if (currentIndex === songsLength - 1) {
            currentIndex = 0
          } else {
            currentIndex += 1
          }
        }
        /**
         * 单曲循环播放模式
         */
        if (this.state.currentPlayModel === 1) {
          /**
           * 继续播放当前歌曲
           */
          this.audioDOM.play()
        }
        /**
         * 随机播放模式
         */
        if (this.state.currentPlayModel === 2) {
          currentIndex = parseInt(Math.random()*songsLength)
        }
        this.props.changeSong(this.props.songs[currentIndex])
      } else {
        /**
         * 单曲循环播放模式
         */
        if (this.state.currentPlayModel === 1) {
          /**
           * 继续播放当前歌曲
           */
          this.audioDOM.play()
        } else {
          this.audioDOM.pause()
          this.stopImgRotate()
          this.setState({
            currentTime: 0,
            playProgress: 0,
            playStatus: false
          })
        }
      }
    })

    /**
     * 在元素加载期间发生错误时运行脚本
     */
    this.audioDOM.addEventListener('error', (err) => {
      console.log('error', err)
      alert('加载歌曲出错！')
    })
  }



  /**
   * 播放或暂停
   */
  playOrPause = () => {
    if (!this.state.playStatus) {
      /**
       * 第一次播放
       */
      if (this.first === undefined) {
        this.audioDOM.src = this.currentSong.url
        this.first = true
      }
      this.playOrPauseSvg = this.pauseSvg
      this.setState({
        playStatus: true
      })
      this.startImgRotate()
      this.audioDOM.play()
    } else {
      this.playOrPauseSvg = this.playSvg
      this.setState({
        playStatus: false
      })
      this.stopImgRotate()
      this.audioDOM.pause()
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
    if (!this.singerImgDOM.classList.contains('rotate')) {
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

  /**
   * 上一首
   */
  previous = () => {
    let songsLength = this.props.songs.length
    let currentIndex = this.currentIndex
    console.log('songsLength', songsLength)
    console.log('currentIndex', currentIndex)
    if (songsLength > 1) {

      /**
       * 列表播放模式
       */
      if (this.state.currentPlayModel === 0) {
        if (currentIndex === 0) {
          currentIndex = songsLength - 1
        } else {
          currentIndex -= 1
        }
      }

      /**
       * 单曲循环播放模式
       */
      if (this.state.currentPlayModel === 1) {
        currentIndex = this.currentIndex
      }

      /**
       * 随机播放模式
       */
      if (this.state.currentPlayModel === 2) {
        currentIndex = parseInt(Math.random()*songsLength)
      }
      this.props.changeSong(this.props.songs[currentIndex])
    }
  }

  /**
   * 下一首
   */
  next = () => {
    let currentIndex = this.currentIndex
    let songsLength = this.props.songs.length
    
    if (songsLength > 1) {
      /**
       * 列表播放模式
       */
      if (this.state.currentPlayModel === 0) {
        if (currentIndex === songsLength - 1) {
          currentIndex = 0
        } else {
          currentIndex += 1
        }
      }

      /**
       * 单曲循环播放模式
       */
      if (this.state.currentPlayModel === 1) {
        currentIndex = this.currentIndex
      }

      /**
       * 随机播放模式
       */
      if (this.state.currentPlayModel === 2) {
        currentIndex = parseInt(Math.random()*songsLength)
      }
    } else {
      currentIndex = this.currentIndex
      if (!songsLength) {
        alert('当前播放列表中无歌曲，请先向播放列表中添加歌曲！')
        return
      }
    }
    this.props.changeSong(this.props.songs[currentIndex])
  }

  /**
   * 拖拽
   */
  handlerDrag = (progress) => {
    if (this.audioDOM.duration) {
      this.audioDOM.pause()
      this.stopImgRotate()
      this.setState({
        playStatus: false
      })
      this.dragProgress = progress
    }
  }
  
  /**
   * 拖拽结束
   */
  handlerDragEnd = () => {
    if (this.audioDOM.duration) {
      let currentTime = this.audioDOM.duration*this.dragProgress
      this.setState({
        currentTime: currentTime,
        playProgress: this.dragProgress
      }, () => {
        this.audioDOM.currentTime = currentTime
        this.audioDOM.play()
        this.startImgRotate()
        this.setState({
          playStatus: true
        })
      })
    }
  }

  /**
   * 隐藏播放器
   */
  handleHidePlayer = () => {
    this.props.showPlayer(false)
    console.log(this.state.playStatus)
  }

  render() {
    console.log('this.props1111111', this.props)
    if (this.props.song) {
      console.log('this.currentSong', this.currentSong)
      console.log('this.props.song', this.props.song)
      if (this.currentSong.id !== this.props.song.albummid) {
        this.currentSong = this.props.song
        this.currentSong.url = `http://dl.stream.qqmusic.qq.com/C100001J5QJL1pRQYB.m4a?vkey=91A134958047EC04A21B8BFB7E9107BACB69E05A534FE40D340F735D128ADD558310154230F4BC6CE6710F441F0CB82636782DE73A72ABD4&fromtag=66`
        this.currentSong.img = `http://y.gtimg.cn/music/photo_new/T002R300x300M000${this.props.song.albummid}.jpg?max_age=2592000`
      }
    }
    let song = this.currentSong
    console.log('song222222222222', song)
    let playBg = song.img ? song.img : require('@/assets/imgs/play_bg.jpg')
    let previousSvg = require('@/assets/imgs/previous.svg')
    
    let nextSvg = require('@/assets/imgs/next.svg')
    let listPlaySvg = require('@/assets/imgs/list_play.svg')
    let backSvg = require('@/assets/imgs/back.svg')
    console.log('playBg', playBg)
    return (
      <div className="player-box" ref="playerBox">
        <CSSTransition in={this.props.showStatus} classNames="player-rotate" timeout={300}
          onEnter={() => {this.playerBoxDOM.style.display='block'}}
          onExited={() => {this.playerBoxDOM.style.display='none'}}
        >
          <div className="player" ref="player">
            <div className="player-header">
              <div className="player-back" onClick={this.handleHidePlayer}>
                <img src={backSvg} alt="" />
              </div>
              <div className="heade-title">
                {song.songname}
              </div>
            </div>
            <div className="singer-top">{}</div>
            <div className="singer-middle">
              <div className="singer-img" ref="singerImg">
                <img src={playBg} alt={song.songname} onLoad={
                  () => {this.playerBgDOM.style.backgroundImage = `url("${playBg}")`}
                }/>
              </div>
            </div>

            <div className="singer-bottom">
              <div className="controller-wrapper">
                <div className="progress-wrapper">
                  <span className="current-time">{'00: 00'}</span>
                  <div className="play-progress">
                    <ProgressBar progress={.4} onDrag={this.handlerDrag} onDragEnd={this.handlerDragEnd}></ProgressBar>
                  </div>
                  <span className="total-time">{'05.00'}</span>
                </div>

                <div className="play-wrapper">
                  <div className="play-model-button" onClick={this.switchPlayModel}>
                    <img src={this.playModels[this.state.currentPlayModel]} alt="播放模式"/>
                  </div>
                  <div className="play-previous-button" onClick={this.previous}>
                    <img src={previousSvg} alt=""/>
                  </div>
                  <div className="play-button" onClick = {this.playOrPause}>
                    <img src={this.playOrPauseSvg} alt=""/>
                  </div>
                  <div className="play-next-button" onClick={this.next}>
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
        </CSSTransition>
      </div>
    )
  }
}

export default Player