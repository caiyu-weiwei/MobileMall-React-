import React, { Component } from 'react'
import Recommend from '@/components/Recommend'
import Rinking from '@/components/Rinking'
import Search from '@/components/Search'
import './index.css'
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from 'react-router-dom'

class MusicTab extends Component {

  render () {
    return (
      <Router>
        <div className="music-tab">
          <div className="music-tabs">
            <div className="tabs-item">
              <NavLink to="/recommend" className="nav-link">推荐</NavLink>
            </div>
            <div className="tabs-item">
              <NavLink to="/rinking" className="nav-link">排行榜</NavLink>
            </div>
            <div className="tabs-item">
              <NavLink to="/search" className="nav-link">搜索</NavLink>
            </div>
          </div>
          <div className="music-view">
            <Switch>
              <Route path="/recommend" component={Recommend}></Route>
              <Route path="/rinking" component={Rinking}></Route>
              <Route path="/search" component={Search}></Route>
              <Redirect from="/" to="/recommend"></Redirect>
              <Route component={Recommend}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}
export default MusicTab
