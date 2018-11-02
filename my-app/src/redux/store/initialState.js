import localStorage from '@/utils/storage'

const initialState = {
  // 皮肤
  skin: localStorage.getSkin(),
  // 显示状态
  showStatus: false,
  // 当前歌曲
  song: localStorage.getCurrentSong(),
  // 歌曲列表
  songs: localStorage.getSongs()
}

export default initialState