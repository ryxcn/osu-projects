package edu.oregonstate.edu.cs492.finalproject.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface YoutubeVideoDao {
    @Insert(onConflict = OnConflictStrategy.ABORT)
    suspend fun insert(video: YoutubeVideo)

    @Delete
    suspend fun delete(video: YoutubeVideo)

    @Query("SELECT * FROM YoutubeVideo")
    fun getAllVideos() : Flow<List<YoutubeVideo>>

    @Query("SELECT * FROM YoutubeVideo WHERE title = :title LIMIT 1")
    fun getVideoByTitle(title: String) : Flow<YoutubeVideo?>

}