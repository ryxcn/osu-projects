package edu.oregonstate.edu.cs492.finalproject.ui

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeSearchRepository
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeSearchResults
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeService
import edu.oregonstate.edu.cs492.finalproject.util.LoadingStatus
import kotlinx.coroutines.launch

class YoutubeSearchViewModel : ViewModel() {
    private val repository = YoutubeSearchRepository(YoutubeService.create())

    private val _searchResults = MutableLiveData<YoutubeSearchResults?>(null)
    val searchResults : LiveData<YoutubeSearchResults?> = _searchResults

    private val _loading = MutableLiveData<Boolean>(false)
    val loading: LiveData<Boolean> = _loading

    private val _error = MutableLiveData<Throwable?>(null)
    val error: LiveData<Throwable?> = _error

    fun loadSearchResults(query: String, apiKey: String){
        viewModelScope.launch {
            _loading.value = true
            val result = repository.searchYoutube(query,apiKey)
            _loading.value = false
            _error.value = result.exceptionOrNull()
            _searchResults.value = result.getOrNull()
        }

    }
}