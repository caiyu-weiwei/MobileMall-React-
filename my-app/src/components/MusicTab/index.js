import React, { Component } from 'react'
import { Tabs, WhiteSpace  } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import Recommend from '@/components/Recommend'
import Rinking from '@/components/Rinking'
import Search from '@/components/Search'
import './index.css'

class MusicTab extends Component {

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
            tabBarUnderlineStyle={{borderBottom:'1px solid #FFD500'}}
            tabBarBackgroundColor="#212121"
            tabBarActiveTextColor="#FFD700"  
          >
            <Recommend></Recommend>
            <Rinking></Rinking>
            <Search></Search>
          </Tabs>
        </StickyContainer>
      </div>
    )
  }
}
export default MusicTab
