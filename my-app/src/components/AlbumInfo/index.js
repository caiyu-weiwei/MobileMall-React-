import React, { Component } from 'react'
import { getAlbumInfo } from '@/api/recommend.js'
import Header from '@/common/Header'
import './index.css'

class AlbumInfo extends Component{

  constructor() {
    super()
    this.state = {
      albumInfo: {}
    }
  }
  // 获取专辑详情的数据源
  componentDidMount() {
    console.log('this.props.router', this.props)
    getAlbumInfo(this.props.match.params.id)
      .then(res => {
        console.log(res)
      })
  }
  render() {
    return(
      <div className="album-container">
        <Header></Header>
      </div>
    )
  }
}

export default AlbumInfo