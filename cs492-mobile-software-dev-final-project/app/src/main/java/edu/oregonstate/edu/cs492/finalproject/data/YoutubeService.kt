package edu.oregonstate.edu.cs492.finalproject.data

import com.squareup.moshi.Moshi
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query
interface YoutubeService {

    //this is the api call to search on youtube
    @GET("search")
    suspend fun searchYoutube(
        @Query("part") part : String,
        @Query("q") query : String,
        @Query("key") apiKey : String,
        @Query("maxResults") maxResults: Int,
        @Query("type") searchType : String
    ) : Response<YoutubeSearchResults>

    companion object {
        private const val BASE_URL = "https://www.googleapis.com/youtube/v3/"

        fun create() : YoutubeService{
            val moshi = Moshi.Builder()
                .add(YoutubeVideoFromJsonAdapter())
                .build()
            return Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(MoshiConverterFactory.create(moshi))
                .build()
                .create(YoutubeService::class.java)
        }
    }

}