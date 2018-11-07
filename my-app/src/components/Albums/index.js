import React, { Component } from 'react'
import { getNewAlbums } from '@/api/recommend'
import './index.css'
class Albums extends Component {
  constructor() {
    super()
    this.state = {
      newAlbums: []
    }
  }

  // 获取新专辑数据源
  componentDidMount() {
    getNewAlbums()
    .then(res => {
      console.log(res)
      if (res.albumlib.code === 0) {
        let albumsList = res.albumlib.data.list
        albumsList.sort((a, b) => {
          return new Date(b.public_time).getTime() - new Date(a.public_time).getTime()
        })
        this.setState({
          newAlbums: albumsList
        })
      }
      
    })
  }

  filterSingers(singers) {
    let singerArray = singers.map(singer => singer.singer_name)
    return singerArray.join('/')
  }
  render() {
    return (
      <div className="new-albums">
      <h1 className="album-title">最新专辑</h1>
        {
          this.state.newAlbums.map(item => (
            <div className="album" key={item.album_id}>
              <div className="album-img">
                <img src={`http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`} alt="专辑"/>
              </div>
              <div className="album-text">
                <div className="album-name">{item.album_name}</div>
                <div className="singer-name">{this.filterSingers(item.singers)}</div>
                <div className="public-time">{item.public_time}</div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default Albums