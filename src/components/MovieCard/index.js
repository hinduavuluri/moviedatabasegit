import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  return (
    <li className="movie-card-container">
      <img src={posterPath} alt={title} className="movie-card-image" />
      <div className="text-container">
        <h1 className="movie-card-heading">{title}</h1>
        <p className="movie-card-rating">Rating: {voteAverage}</p>
      </div>
      <Link to={`/movie/${id}`} className="movie-card">
        <button className="view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard
