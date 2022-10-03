import videoDummyData from '../data/videos.json'
import { getWatchedVideos, getMyFavourited } from './db/hasura'

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

  const baseUrl = 'https://youtube.googleapis.com/youtube/v3'
  const response = await fetch(`${baseUrl}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
  return await response.json()
}
export const getCommonVideos = async (url) => {
  // 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY]'
  try {
    const isDev = process.env.DEVELOPMENT
    const data = isDev ? videoDummyData : await fetchVideos(url)
    // const baseUrl = 'https://youtube.googleapis.com/youtube/v3'
    // const response = await fetch(`${baseUrl}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
    // const data = await response.json()

    if (data?.error) {
      console.log('youtube error*****', data.error)
      return []
    }

    return data?.items.map((item, index) => {
      const id = item?.id?.videoId || item.id || index
      return {
        id,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        title: item?.snippet?.title,
        description: item.snippet.description,
        publishTime: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 }
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

export const fetchWatchedVideos = async (userId, token) => {
  const videos = await getWatchedVideos(token, userId)
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
      }
    }) || []
  )
}

export const fetchFavouritedVideos = async (userId, token) => {
  const videos = await getMyFavourited(token, userId)
  return (
    videos?.map((video) => {
      return {
        id: video.videoId,
        imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`
      }
    }) || []
  )
}
