package edu.oregonstate.edu.cs492.finalproject.data

import android.util.Log
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.Dispatcher
import java.lang.Exception
import kotlin.time.Duration.Companion.minutes
import kotlin.time.TimeSource

class YoutubeSearchRepository (
    private val service: YoutubeService,
    private val ioDispatcher: CoroutineDispatcher = Dispatchers.IO
){

    private var currentSearch : String? = null
    private var cachedSearch : YoutubeSearchResults? = null

    private val cacheMaxAge = 5.minutes
    private val timeSource = TimeSource.Monotonic
    private var timeStamp = timeSource.markNow()

    suspend fun searchYoutube(
        search: String?,
        apikey: String
    ) : Result<YoutubeSearchResults?>{

        Log.d("Repository", "Searching")
        return if (shouldFetch(search)){
            withContext(ioDispatcher){
                try{
                    val response = service.searchYoutube(
                        part = "snippet", search!!,
                        apikey,
                        maxResults = 25,
                        searchType = "video")
                    if (response.isSuccessful){
                        Log.d("Repository", "Search Complete")
                        cachedSearch = response.body()
                        Log.d("Repository", cachedSearch.toString())
                        timeStamp = timeSource.markNow()
                        currentSearch = search
                        Result.success(cachedSearch)
                    }
                    else{
                        Log.d("Repository", "Search Failed")
                        Result.failure(Exception(response.errorBody()?.string()))
                    }
                } catch (e: Exception){
                    Result.failure(e)
                }
            }
        }
        else{
            Log.d("Repository", "Sending cached")
            Result.success(cachedSearch!!)
        }
    }




    private fun shouldFetch(search : String?): Boolean =
        cachedSearch == null
                || search != currentSearch
                || (timeStamp + cacheMaxAge).hasPassedNow()

}