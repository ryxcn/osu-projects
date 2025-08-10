package edu.oregonstate.edu.cs492.finalproject.ui

import android.text.Layout
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.view.menu.ActionMenuItemView
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import com.bumptech.glide.Glide
import edu.oregonstate.edu.cs492.finalproject.R
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeSearchResults
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideo
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideoItem

class YoutubeSearchAdapter(
    private val onVideoClick: (YoutubeVideo) -> Unit
) : RecyclerView.Adapter<YoutubeSearchAdapter.YoutubeSearchViewHolder>(){
    private  var searchResults : List<YoutubeVideo> = listOf()


    fun updateRepoList(newResultsList: List<YoutubeVideo>?) {
        notifyItemRangeRemoved(0, searchResults.size)
        searchResults = newResultsList ?: listOf()
        notifyItemRangeInserted(0, searchResults.size)
    }


    class YoutubeSearchViewHolder (
        itemView: View,
        onClick: (YoutubeVideo) -> Unit
    ) : RecyclerView.ViewHolder(itemView){
        private val tvVideoTitle : TextView = itemView.findViewById(R.id.tv_video_title)
        private val tvChannelTitle : TextView = itemView.findViewById(R.id.tv_channel_name)
        private val ivThumbnail : ImageView = itemView.findViewById(R.id.iv_thumbnail)
        private lateinit var currentVideo : YoutubeVideo

        fun bind(video : YoutubeVideo){
            currentVideo = video

            val ctx = itemView.context

            tvVideoTitle.text = (video.title).replace("&#39;", "'").replace("&quot;", "\"")
            tvChannelTitle.text = video.channelTitle

            Glide.with(ctx)
                .load(video.thumbnailURL)
                .into(ivThumbnail)

        }

        init {
            itemView.setOnClickListener {
                currentVideo?.let(onClick)
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): YoutubeSearchViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.youtube_search_list_item, parent,false)
        return YoutubeSearchViewHolder(view, onVideoClick)
    }

    override fun getItemCount(): Int {
        return searchResults.size
    }

    override fun onBindViewHolder(holder: YoutubeSearchViewHolder, position: Int) {
        holder.bind(searchResults[position])
    }


}