import fetch from 'cross-fetch'
import { URL } from './config.js'

export async function getCarousel() {
  return await fetch(
    URL.carousel,
    {
      method: "post",
      mode: "cors",
      headers: {
        'content-type':'application/x-www-form-urlencoded'
      }
    }
  )
}