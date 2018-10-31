import { connect } from 'react-redux'
/**
 * 将木偶组件变成智能组件
 * @param  {Function} mapStateToProps
 * @param  {Object}   mapActionCreators
 * @param  {Component?}
 * @return {Connect : Container}
 */
function createContainer (mapStateToProps, mapDispatchToProps, component) {
  const connectComponent = connect(mapStateToProps, mapDispatchToProps)
  return component ? connectComponent(component) : connectComponent
}

export default createContainer