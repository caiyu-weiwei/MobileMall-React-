/**
 * @param  {initialState} 初始状态
 * @param  {handlers} handlers
 * @param  {action}   action
 * @return {Reducer}
 */

function createReducer (initialState, handlers) {
  return (state = initialState, action) => {
    const handler = handlers[action.type]
    return handler ? handler(state, action) : state
  }
}

export default createReducer