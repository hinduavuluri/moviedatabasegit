import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

class TopRated extends Component {
  state = {
    isLoading: true,
    topRatedMovieResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMoviesReponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(each => ({
      id: each.id,
      posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  getTopRatedMoviesReponse = async (pageNo = 1) => {
    const API_KEY = '96ffac947de321cb84f966732a7bf7d2'
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, topRatedMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#1c5706" className="loader" />
    </div>
  )

  renderTopRatedMovies = () => {
    const {topRatedMovieResponse} = this.state
    const {results} = topRatedMovieResponse
    return (
      <ul className="top-rated-movies-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMovieResponse} = this.state
    return (
      <>
        <Navbar />
        <div className="top-rated-page-body">
          {isLoading ? this.renderLoadingView() : this.renderTopRatedMovies()}
        </div>
        <Pagination
          totalPages={topRatedMovieResponse.totalPages}
          apiCallback={this.getTopRatedMoviesReponse}
        />
      </>
    )
  }
}
export default TopRated
