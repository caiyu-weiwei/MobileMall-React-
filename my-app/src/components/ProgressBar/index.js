import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import './index.css'

/**
 * Progress组件接收进度（progress），是否禁用按钮（disableButton），是否禁用拖拽（disableDrag），开始拖拽回调函数（onDragStart），拖拽中回调函数（onDrag）和拖拽接受回调函数（onDragEnd）等属性
 */
class Progress extends Component{

  componentDidMount() {
    let { disableButton, disableDrag, onDragStart, onDrag, onDragEnd } = this.props
    let progressBarDom =ReactDOM.findDOMNode(this.refs.progressBar)
    let progressDom = ReactDOM.findDOMNode(this.refs.progress)
    let progressBtnDom = ReactDOM.findDOMNode(this.refs.progressBtn)
    this.progressBarWidth = progressBarDom.offsetWidth
    console.log('componentDidMount', this.progressBarWidth)

    /**
     * 拖拽初始位置
     */
    let dragX = 0

    /**
     * 按钮初始偏移位置
     */
    let buttonLeft = 0

    if (!disableButton && !disableDrag) {
      /**
       * 进度按钮
       * 监听开始拖动
       */
      progressBtnDom.addEventListener('touchstart', e => {
        // console.log('touchstart e', e)
        let touch = e.touches[0]
        dragX = touch.clientX
        buttonLeft = parseInt(touch.target.style.left)
        console.log('dragX', dragX)
        console.log('buttonLeft', buttonLeft)
        if (onDragStart) onDragStart()
      })

      /**
       * 进度按钮
       * 监听拖动过程中
       */
      progressBtnDom.addEventListener('touchmove', e => {
        // console.log('touchmove e', e)
        e.preventDefault()
        let touch = e.touches[0]
        let diffX = touch.clientX - dragX
        let butLeft = buttonLeft + diffX
        if (butLeft > this.progressBarWidth) butLeft = this.progressBarWidth
        if (butLeft < 0) butLeft = 0
        touch.target.style.left = butLeft + 'px'
        progressDom.style.width = butLeft / this.progressBarWidth * 100 + '%'

        if (onDrag) onDrag(butLeft / this.progressBarWidth)
      })

      /**
       * 进度按钮
       * 监听拖动结束
       */
      progressBtnDom.addEventListener('touchend', e => {
        // console.log('touchend e', e)
        if (onDragEnd) onDragEnd()
      })
    }
  }

  /**
   * 如果未获取进度条的宽度，可以通过组件更新后再次获取
   */
  componentDidUpdate() {
    console.log('componentDidUpdate', this.progressBarWidth)
    if (!this.progressBarWidth) this.progressBarWidth = ReactDOM.findDOMNode(this.refs.progressBar).offsetWidth
  }

  render() {
    let { progress, disableButton } = this.props
    let progressButtonOffsetLeft = 0
    if (!progress) progress = 0
    console.log('progress', progress)
    console.log('this.progressBarWidth', this.progressBarWidth)
    if (this.progressBarWidth) progressButtonOffsetLeft = progress * this.progressBarWidth

    return(
      <div className="progress-bar" ref="progressBar">
        <div className="progress" ref="progress" style={{width: `${progress * 100}%`}}></div>
        {
          disableButton ? null : <div className="progress-button" ref="progressBtn" style={{left: progressButtonOffsetLeft}}></div>
        }
      </div>
    )
  }
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  disableButton: PropTypes.bool,
  disableDrag: PropTypes.bool,
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func
}

export default Progress