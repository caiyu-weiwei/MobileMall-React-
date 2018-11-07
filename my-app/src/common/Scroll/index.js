import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'
import BScroll from 'better-scroll'

class Scroll extends Component{
  componentDidMount() {
    this.scrollView = ReactDom.findDOMNode(this.refs.scrollView)
    if (!this.bScroll) {
      this.bScroll = new BScroll(this.scrollView, {
        probeType: 3,
        click: this.props.click
      })
    }
    if (this.props.onScroll) this.bScroll.on('scroll', () => {
      this.props.onScroll()
    })
  }

  // 组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
  componentDidUpdate() {
    if (this.bScroll && this.props.refresh) {
      this.bScroll.refresh()
    }
  }

  componentWillUnmount() {
    this.bScroll.off('scroll')
    this.bScroll.destroy()
  }

  render() {
    return(
      <div className="scroll-view" ref="scrollView">
        {/**获取子组建**/}
        {this.props.children}
      </div>
    )
  }
}

// 对组件的props进行类型检查，这里使用prop-types库。类型检查是为了提早发现开发问题，避免一些bug产生
Scroll.defaultProps = {
  click: true,
  refresh: false,
  onScroll: null
}

Scroll.propTypes = {
  click: PropTypes.bool,
  refresh: PropTypes.bool,
  onScroll: PropTypes.func
}

export default Scroll