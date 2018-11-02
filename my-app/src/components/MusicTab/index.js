import React, { Component } from 'react'
import { Tabs, WhiteSpace  } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import './index.css'

class MusicTab extends Component {
  constructor () {
    super ()
  }

  renderTabBar(props) {
    return (
      <Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>
    )
  }

  tabs = [
    { title: '推荐' },
    { title: '排行榜' },
    { title: '搜索' },
  ]

  render () {
    return (
      <div className="music-tab">
        <WhiteSpace />
        <StickyContainer>
          <Tabs
            tabs={this.tabs}
            renderTabBar={this.renderTabBar}
            tabBarUnderlineStyle={{borderBottom:'1px solid #FFD500'}}
            tabBarBackgroundColor="#212121"
            tabBarActiveTextColor="#FFD700"
            
          >
            <div className="tabs-item">
              Content of first tab
            </div>
            <div className="tabs-item">
              Content of second tab
            </div>
            <div className="tabs-item">
              Content of third tab
            </div>
          </Tabs>
        </StickyContainer>
      </div>
    )
  }
}
export default MusicTab
