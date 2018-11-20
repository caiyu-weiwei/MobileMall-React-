import { combineReducers } from 'redux'
import * as ActionTypes from '../actions/actionTypes.js'

/**
 * reducer就是一个纯函数，接受旧的state和action,返回新的state
 */

// 需要存储的初始状态数据

const initialState = {
  showStatus: false, // 歌曲播放页显示状态
  song: {}, // 当前歌曲
  songs: []  // 歌曲列表
}

// 拆分reducer

// 显示或隐藏歌曲播放页 的状态
function showStatus(showStatus = initialState.showStatus, action) {
  switch(action.type) {
    case ActionTypes.SHOW_PLAYER:
      return action.showStatus
    default:
      return showStatus
  }
}

// 修改当前歌曲
function song(song = initialState.song, action) {
  switch(action.type) {
    case ActionTypes.CHANGE_SONG:
      return action.song
    default:
      return song
  }
}

// 设置歌曲列表
function songs(songs = initialState.songs, action) {
  switch(action.type) {
    case ActionTypes.SET_SONGS:
      return action.songs
    default:
      return songs
  }
}

const Reducer = combineReducers({
  showStatus,
  song,
  songs
})

export default Reducer
