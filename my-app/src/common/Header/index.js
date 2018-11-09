import React, { Component } from 'react'
import {Icon} from 'antd-mobile'
import './index.css'

class Header extends Component {
  
  handlerClickBack() {
    window.history.back()
  }
  render() {
    return(
      <div className="header-container">
        <div className="header-back" onClick={this.handlerClickBack}>
          <Icon type="left" size="lg"/>
        </div>
        <div className="header-title">1212</div>
      </div>
    )
  }
}

export default Header