import videoData from '../data/videos.json'

export const getCommonVideos = async (url) => {
  // 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY]'
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  try {
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3'
    const response = await fetch(`${baseUrl}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
    const data = await response.json()

    if (data?.error) {
      console.log('youtube error*****', data.error)
      return []
    }

    return data?.items.map((item, index) => {
      const id = item?.id?.videoId || item.id || index
      return {
        id,
        imgUrl: item?.snippet?.thumbnails?.high?.url,
        title: item?.snippet?.title
      }
    })
  } catch (error) {
    console.log('sth went wrong*****', error)
    return []
  }
}

export const getVideos = (searchQuery) => {
  const url = `search?part=snippet&q=${searchQuery}&type=video`
  return getCommonVideos(url)
}

export const getPopularVideos = () => {
  const url =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'

  return getCommonVideos(url)

  //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
}

export const getVideoById = (id) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`

  return getCommonVideos(url)
}
