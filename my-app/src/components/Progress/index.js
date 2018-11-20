import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

class Progress extends Component{
  render() {
    return(
      <div className="progress-container"></div>
    )
  }
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired,
  
}

export default Progress