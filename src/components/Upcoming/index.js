import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Navbar from '../Navbar'
import Pagination from '../Pagination'

import './index.css'

class Upcoming extends Component {
  state = {
    isLoading: true,
    upcomingMovieResponse: {},
  }

  componentDidMount() {
    this.getUpcomingMoviesReponse()
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

  getUpcomingMoviesReponse = async (pageNo = 1) => {
    const API_KEY = '96ffac947de321cb84f966732a7bf7d2'
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, upcomingMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#1c5706" className="loader" />
    </div>
  )

  renderUpcomingMovies = () => {
    const {upcomingMovieResponse} = this.state
    const {results} = upcomingMovieResponse
    return (
      <ul className="top-rated-movies-container">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, upcomingMovieResponse} = this.state
    return (
      <>
        <Navbar />
        <div className="top-rated-page-body">
          {isLoading ? this.renderLoadingView() : this.renderUpcomingMovies()}
        </div>
        <Pagination
          totalPages={upcomingMovieResponse.totalPages}
          apiCallback={this.getUpcomingMoviesReponse}
        />
      </>
    )
  }
}
export default Upcoming
