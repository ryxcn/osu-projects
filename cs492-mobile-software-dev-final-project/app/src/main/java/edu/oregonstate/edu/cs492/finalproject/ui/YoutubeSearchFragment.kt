package edu.oregonstate.edu.cs492.finalproject.ui

import android.app.SearchManager
import android.content.Intent
import android.graphics.ColorSpace.Adaptation
import android.os.Bundle
import android.text.TextUtils
import android.util.Log
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.core.view.MenuHost
import androidx.core.view.MenuProvider
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Lifecycle
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.progressindicator.CircularProgressIndicator
import edu.oregonstate.edu.cs492.finalproject.R
import edu.oregonstate.edu.cs492.finalproject.data.YoutubeVideo

class YoutubeSearchFragment : Fragment(R.layout.fragment_youtube_search){
    private val viewModel : YoutubeSearchViewModel by viewModels()
    private val adapter = YoutubeSearchAdapter(::onYoutubeVideoClick)

    private lateinit var searchResultsListRV : RecyclerView
    private lateinit var searchErrorTV: TextView
    private lateinit var loadingIndicator : CircularProgressIndicator


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val searchBoxET: EditText = view.findViewById(R.id.edit_search_box)
        val searchButton : Button = view.findViewById(R.id.button_search)

        searchErrorTV = view.findViewById(R.id.tv_search_error)
        loadingIndicator = view.findViewById(R.id.loading_indicator)

        searchResultsListRV = view.findViewById(R.id.rv_search_results)
        searchResultsListRV.layoutManager = LinearLayoutManager(requireContext())
        searchResultsListRV.setHasFixedSize(true)

        searchResultsListRV.adapter = adapter

        viewModel.searchResults.observe(viewLifecycleOwner) {
                searchResults -> adapter.updateRepoList(searchResults?.items)
        }


        searchButton.setOnClickListener {
            val query = searchBoxET.text.toString()
            if(!TextUtils.isEmpty(query)){
                viewModel.loadSearchResults(
                    query,
                    BuildConfig.API_KEY
                )
                searchResultsListRV.visibility = View.VISIBLE
                searchResultsListRV.scrollToPosition(0)
            }
        }

        viewModel.error.observe(viewLifecycleOwner) { error ->
            if (error != null) {
                searchErrorTV.text = getString(R.string.loading_error, error.message)
                searchErrorTV.visibility = View.VISIBLE
                Log.e(tag, "Error fetching forecast: ${error.message}")
                error.printStackTrace()
            }
        }

        viewModel.loading.observe(viewLifecycleOwner) { loading ->
            if (loading) {
                loadingIndicator.visibility = View.VISIBLE
                searchErrorTV.visibility = View.INVISIBLE
                searchResultsListRV.visibility = View.INVISIBLE
            } else {
                loadingIndicator.visibility = View.INVISIBLE
            }
        }

        val menuHost: MenuHost = requireActivity()
        menuHost.addMenuProvider(
            object : MenuProvider {
                override fun onCreateMenu(menu: Menu, menuInflater: MenuInflater) {
                    menuInflater.inflate(R.menu.youtube_search_menu, menu)
                }
                override fun onMenuItemSelected(menuItem: MenuItem): Boolean {
                    return when (menuItem.itemId){
                        R.id.action_view_bookmarks -> {
                            val directions = YoutubeSearchFragmentDirections.navigateToBookmarkedVideos()
                            findNavController().navigate(directions)
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
    private fun onYoutubeVideoClick(video : YoutubeVideo){
        Log.d("MainActivity", "Video Clicked ${video.title}")
        val directions = YoutubeSearchFragmentDirections.navigateToVideoDetail(video)
        findNavController().navigate(directions)
    }
}