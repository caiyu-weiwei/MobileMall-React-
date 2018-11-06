import fetch from 'cross-fetch'
import { URL } from './config'

export async function getCarousel() {
  return await fetch(URL.carousel)
}