import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SearchQuery from './components/SearchQuery'
import MovieContext from './context/MovieContext'

import './App.css'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })
  const onTriggerSearchQuery = async (pageNo = 1) => {
    setApiStatus('IN_PROGRESS')
    const API_KEY = '96ffac947de321cb84f966732a7bf7d2'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}
      &language=en-US&query=${searchInput}&page=${pageNo}`

    const response = await fetch(url)
    const data = response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }
  return (
    <MovieContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearchQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <Switch>
        <Route exact path="/" component={Popular} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/search" component={SearchQuery} />
      </Switch>
    </MovieContext.Provider>
  )
}

export default App
