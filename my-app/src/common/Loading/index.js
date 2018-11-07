import React, { Component } from 'react'
import loadingImg from './loading.gif'
import './index.css'

class Loading extends Component{
  render() {
    let displayStyle = this.props.isShow ? {display: 'block'} : {display: 'none'}
    return(
      <div className="loading-container" style={displayStyle}>
        <div className="loading-wrapper">
          <img src={loadingImg} alt="loading" width="20px" height="20px"/>
          <div className="loading-title">{this.props.title?this.props.title:null}</div>
        </div>
      </div>
    )
  }
}

export default Loading