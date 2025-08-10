package edu.oregonstate.edu.cs492.finalproject.data

class BookmarkedVideosRepository(
    private val dao: YoutubeVideoDao
) {
    suspend fun insertBookmarkedVideo(video: YoutubeVideo) = dao.insert(video)
    suspend fun deleteBookmarkedVideo(video: YoutubeVideo) = dao.delete(video)
    fun getAllBookmarkedVideos() = dao.getAllVideos()
    fun getBookmarkedVideoName(title: String) = dao.getVideoByTitle(title)
}