package edu.oregonstate.edu.cs492.finalproject.data


import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class YoutubeVideoItem(
    @PrimaryKey val title: String,
    val timestamp: Long
)
