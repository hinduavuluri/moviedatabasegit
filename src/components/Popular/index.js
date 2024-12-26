import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

import './index.css'

class Popular extends Component {
  state = {
    isLoading: true,
    popularMoviesResponse: {},
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
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

  getPopularMoviesResponse = async (pageNo = 1) => {
    const API_KEY = '96ffac947de321cb84f966732a7bf7d2'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`
    const response = await fetch(url)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMoviesResponse: newData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4e37e4" />
    </div>
  )

  displayMoviesResponse = () => {
    const {popularMoviesResponse} = this.state
    const {results} = popularMoviesResponse
    return (
      <ul className="result-list">
        {results.map(each => (
          <MovieCard movieDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, popularMoviesResponse} = this.state
    return (
      <>
        <Navbar />
        <div className="page-body">
          {isLoading ? this.renderLoadingView() : this.displayMoviesResponse()}
        </div>
        <Pagination
          totalPages={popularMoviesResponse.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </>
    )
  }
}
export default Popular
