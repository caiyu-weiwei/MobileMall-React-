import * as ActionTypes from './actionTypes'

export var setSkin = skin => dispatch => {
  return dispatch({type: ActionTypes.SET_SKIN, skin})
}

export var showPlayer = showStatus => dispatch => {
  return dispatch({type: ActionTypes.SHOW_PLAYER, showStatus})
}