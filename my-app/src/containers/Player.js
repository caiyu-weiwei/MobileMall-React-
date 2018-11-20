import { connect } from 'react-redux'
import Player from '@/components/Player'
import { showPlayer, changeSong } from '@/redux/actions'
import store from '../redux/store'


const mapStateToProps = state => {
  console.log('this.props.state', state)
  return {
    showStatus: state.showStatus,
    song: state.song,
    songs: state.songs
  }
}

const mapDispatchToProps = dispatch => ({
  showPlayer: showStatus => {
    dispatch(showPlayer(showStatus))
  },
  changeSong: song => {
    dispatch(changeSong(song))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)