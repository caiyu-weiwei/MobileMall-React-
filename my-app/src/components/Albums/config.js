export function filterSingers(singers) {
    let singerArray = singers.map(singer => singer.singer_name)
    return singerArray.join('/')
  }