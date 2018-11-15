export function filterSingers(singers) {
  let singerArray = singers.map(singer => singer.name)
  return singerArray.join('/')
}