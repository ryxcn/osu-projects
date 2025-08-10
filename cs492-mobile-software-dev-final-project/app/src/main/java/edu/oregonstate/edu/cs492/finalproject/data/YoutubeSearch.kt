package edu.oregonstate.edu.cs492.finalproject.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.squareup.moshi.FromJson
import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import com.squareup.moshi.ToJson
import java.io.Serializable
@Entity
data class YoutubeVideo(
    @PrimaryKey val title : String,
    val description : String,
    val videoId : String,
    val channelTitle : String,
    val thumbnailURL : String

) : Serializable
@JsonClass(generateAdapter = true)
data class YoutubeItemAdapter(
    val id: IdAdapter,
    val snippet: SnippetAdapter
)
@JsonClass(generateAdapter = true)
data class IdAdapter(
    val videoId: String
)
@JsonClass(generateAdapter = true)
data class SnippetAdapter(
    val title : String,
    val description: String,
    val thumbnails : ThumbnailAdapter,
    val channelTitle : String
)


@JsonClass(generateAdapter = true)
data class ThumbnailAdapter(
    val high: DefaultAdapter
)

@JsonClass(generateAdapter = true)
data class DefaultAdapter(
    val url : String
)

@JsonClass(generateAdapter = true)
data class YoutubeSearchResults(
    val items : List<YoutubeVideo>
)


class YoutubeVideoFromJsonAdapter {
    @FromJson
    fun YoutubeVideoFromJson(items: YoutubeItemAdapter ) = YoutubeVideo(
        title = items.snippet.title,
        description = items.snippet.description,
        channelTitle = items.snippet.channelTitle,
        videoId = items.id.videoId,
        thumbnailURL = items.snippet.thumbnails.high.url
    )

    @ToJson
    fun youtubeVideoToJson(youtubeVideo: YoutubeVideo): String {
        throw UnsupportedOperationException("encoding YoutubeVideo to JSON is not supported")
    }
}