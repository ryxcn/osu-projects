package edu.oregonstate.edu.cs492.finalproject.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.asLiveData
import androidx.lifecycle.viewModelScope
import edu.oregonstate.edu.cs492.finalproject.data.AppDatabase
import edu.oregonstate.edu.cs492.finalproject.data.BookmarkedVideosRepository
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideo
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideoItem
import kotlinx.coroutines.launch

class BookmarkedVideosViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = BookmarkedVideosRepository(
        AppDatabase.getInstance(application).youtubeVideoDao()
    )

    val bookmarkedVideos = repository.getAllBookmarkedVideos().asLiveData()

    fun addBookmarkedVideo(video: YoutubeVideo) {
        viewModelScope.launch {
            repository.insertBookmarkedVideo(video)
        }
    }

    fun removeBookmarkedVideo(video: YoutubeVideo) {
        viewModelScope.launch {
            repository.deleteBookmarkedVideo(video)
        }
    }

    fun getBookmarkedRepoByTitle(title: String) =
        repository.getBookmarkedVideoName(title).asLiveData()

}