import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'
import MovieContext from '../../context/MovieContext'

import './index.css'

const SearchQuery = () => {
  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#984c4d" />
    </div>
  )

  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found</h1>
      <p>Do not get worried. Try to search again.</p>
    </div>
  )

  const renderSuccessView = searchResponse => {
    const {results} = searchResponse
    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="search-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }
  const renderSearchResultsView = value => {
    const {searchResponse, apiStatus} = value
    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderSuccessView(searchResponse)
      default:
        return renderEmptyView()
    }
  }
  return (
    <MovieContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchQuery} = value
        return (
          <>
            <Navbar />
            <div>{renderSearchResultsView(value)}</div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchQuery}
            />
          </>
        )
      }}
    </MovieContext.Consumer>
  )
}
export default SearchQuery
