import jsonp  from './jsonp'
import { URL, PARAM, OPTION } from './config.js'

// 轮播图数据请求
export async function getCarousel() {
  const data = Object.assign({}, PARAM, {
		g_tk: 701075963,
		uin: 0,
		platform: "h5",
		needNewCode: 1,
		_: new Date().getTime()
	})

  return await jsonp(URL.carousel, data, OPTION)
}

// 最新专辑数据请求
export async function getNewAlbums() {
	const data = Object.assign({}, PARAM, {
		g_tk: 1278911659,
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0,
		data: `{"albumlib":
		{"method":"get_album_by_tags","param":
		{"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":1,"num":10,"click_albumid":0},
		"module":"music.web_album_library"}}`
	})
	const option = {
		param: "callback",
		prefix: "callback"
	}
	return await jsonp(URL.newalbum, data, option)
}

// 专辑详情数据请求
export async function getAlbumInfo(albumMid) {
	const data = Object.assign({}, PARAM, {
		albummid: albumMid,
		g_tk: 1278911659,
		hostUin: 0,
		platform: "yqq",
		needNewCode: 0
	})
	return await jsonp(URL.albumInfo, data, OPTION)
}
