package edu.oregonstate.edu.cs492.finalproject.ui

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.widget.TextView
import androidx.appcompat.content.res.AppCompatResources
import androidx.core.view.MenuHost
import androidx.core.view.MenuProvider
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.navigation.fragment.navArgs
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.YouTubePlayer
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.listeners.AbstractYouTubePlayerListener
import com.pierfrancescosoffritti.androidyoutubeplayer.core.player.views.YouTubePlayerView
import edu.oregonstate.edu.cs492.finalproject.R
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideoItem

class VideoDetailFragment : Fragment(R.layout.fragment_youtube_video_detail) {

    private val args: VideoDetailFragmentArgs by navArgs()
    private val viewModel: BookmarkedVideosViewModel by viewModels()
    private lateinit var videoURL : String
    private var isBookmarked = false

    private var bookmarkMenuItem: MenuItem? = null
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        videoURL = getString(R.string.videoURL, args.video.videoId)
        val tvVideoTitle : TextView = view.findViewById(R.id.tv_detailed_video_title)
        val tvVideoDescription : TextView = view.findViewById(R.id.tv_detailed_video_description)

        tvVideoTitle.text = cleanedTitle(args.video.title)
        tvVideoDescription.text = args.video.description


        val youTubePlayerView : YouTubePlayerView = view.findViewById(R.id.youtube_player_view)
        lifecycle.addObserver(youTubePlayerView)


//        val playerStateListener = object : AbstractYouTubePlayerListener(){
//            override fun onReady(youTubePlayer: YouTubePlayer) {
//                super.onReady(youTubePlayer)
//                val startTime : Float = 0.toFloat()
//                Log.d("Fragment", args.video.videoId)
//                youTubePlayer.loadVideo(args.video.videoId, startTime)
//            }
//        }

        youTubePlayerView.addYouTubePlayerListener(object : AbstractYouTubePlayerListener(){
            override fun onReady(youTubePlayer: YouTubePlayer) {
                super.onReady(youTubePlayer)
                youTubePlayer.loadVideo(args.video.videoId,0f)
            }
        })

        viewModel.getBookmarkedRepoByTitle(args.video.title).observe(viewLifecycleOwner) { video  ->
            when(video) {
                //when video is null, means it is not in the database
                null -> {
                    isBookmarked = false
                    bookmarkMenuItem?.icon = AppCompatResources.getDrawable(
                        requireContext(),
                        R.drawable.ic_action_favorite_off
                    )
                }
                else -> {
                    isBookmarked = true
                    bookmarkMenuItem?.icon = AppCompatResources.getDrawable(
                        requireContext(),
                        R.drawable.ic_action_favorite_on
                    )
                }
            }
            bookmarkMenuItem?.isChecked = isBookmarked
        }


        val menuHost: MenuHost = requireActivity()
        menuHost.addMenuProvider(
            object : MenuProvider {
                override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {
                    menuInflater.inflate(R.menu.page_menu, menu)
                    bookmarkMenuItem = menu.findItem(R.id.action_bookmark)
//                    bookmarkMenuItem?.isChecked = isBookmarked
                }

                override fun onMenuItemSelected(menuItem: MenuItem): Boolean {
                    return when (menuItem.itemId) {
                        R.id.action_share -> {
                            share()
                            true
                        }
                        R.id.action_bookmark -> {
                            toggleVideoBookmark(menuItem)
                            true
                        }
                        else -> false

                    }
                }

            },
            viewLifecycleOwner,
            Lifecycle.State.STARTED
        )


    }

    private fun toggleVideoBookmark(menuItem: MenuItem) {
        when (!isBookmarked) {
            true -> {
                viewModel.addBookmarkedVideo(args.video) //insert into database when it's not bookmarked
            }
            false -> {
                viewModel.removeBookmarkedVideo(args.video) //else remove
            }
        }
    }

    private fun share() {
        val shareText = getString(
            R.string.share_text,
            videoURL
        )

        val intent: Intent = Intent().apply {
            action = Intent.ACTION_SEND
            putExtra(Intent.EXTRA_TEXT, shareText)
            type = "text/plain"
        }
        startActivity(Intent.createChooser(intent, null))

    }

    private fun cleanedTitle(title: String): String {
        return title.replace("&#39;", "'").replace("&quot;", "\"")
    }
}