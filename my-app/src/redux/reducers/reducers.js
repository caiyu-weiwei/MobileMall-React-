/**
 * 拆分reducers
 */

 import localStorage from '@/utils/storage'
 import initialState from '@/redux/storage/initialState'
 import * as ActionTypes from '@/redux/actions/actionTypes'

//  设置皮肤
export var setSkin = (skin = initialState.skin, action) => {
  switch (action.type) {
    case ActionTypes.SET_SKIN :
      localStorage.setSkin(skin)
      return action.skin
    default :
      return skin
  }
}

// 显示或隐藏播放器的状态
export var showPlayer = (showStatus = initialState.showStatus, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_PLAYER :
      return action.showStatus
    default :
      return showStatus
  }
}
