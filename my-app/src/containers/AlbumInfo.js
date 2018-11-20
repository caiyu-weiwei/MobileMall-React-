import { connect } from 'react-redux'
import { showPlayer, changeSong, setSongs } from '@/redux/actions'
import AlbumInfo from '@/components/AlbumInfo'


/**
 * 映射dispatch到props上
 * @param {*} dispatch 
 */
const mapDispatchToProps = dispatch => ({
  showPlayer: showStatus => {
    dispatch(showPlayer(showStatus))
  },
  changeSong: song => {
    dispatch(changeSong(song))
  },
  setSongs: songs => {
    dispatch(setSongs(songs))
  }
})

/**
 * 代码中connect第一个参数用来映射store到组件props上，第二个参数是映射dispatch到props上，然后把Album组件传入，这里不需要获取store的状态，传入null
 */

export default connect(null, mapDispatchToProps)(AlbumInfo)

