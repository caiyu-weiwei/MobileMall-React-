import jsonp  from './jsonp'
import { URL, PARAM, OPTION } from './config.js'

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