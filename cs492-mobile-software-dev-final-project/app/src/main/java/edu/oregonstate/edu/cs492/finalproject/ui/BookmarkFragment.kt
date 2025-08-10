package edu.oregonstate.edu.cs492.finalproject.ui

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import edu.oregonstate.edu.cs492.finalproject.R
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideo


class BookmarkFragment : Fragment(R.layout.fragment_bookmark) {
    private val adapter = YoutubeSearchAdapter(::onYoutubeVideoClick)
    private val viewModel: BookmarkedVideosViewModel by viewModels()

    private lateinit var bookmarkedReposRV: RecyclerView

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        bookmarkedReposRV = view.findViewById(R.id.rv_bookmarked_videos)
        bookmarkedReposRV.layoutManager = LinearLayoutManager(requireContext())
        bookmarkedReposRV.setHasFixedSize(true)
        bookmarkedReposRV.adapter = adapter

        viewModel.bookmarkedVideos.observe(viewLifecycleOwner) { bookmarkedVideos ->
//            adapter.updateRepoList(bookmarkedVideos)
            val displayList = bookmarkedVideos.reversed()
            adapter.updateRepoList(displayList)

        }

    }

    private fun onYoutubeVideoClick(video : YoutubeVideo) {
        val directions = YoutubeSearchFragmentDirections.navigateToVideoDetail(video)
        findNavController().navigate(directions)
    }

}