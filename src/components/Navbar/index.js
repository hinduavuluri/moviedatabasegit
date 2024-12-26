import {Link, withRouter} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './index.css'

const Navbar = props => {
  const renderSearchBar = () => (
    <MovieContext.Consumer>
      {value => {
        const {onTriggerSearchQuery, searchInput, onChangeSearchInput} = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchQuery()
          history.replace('/search')
        }
        return (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              value={searchInput}
              onChange={onChangeHandler}
              placeholder="Search"
            />
            <button type="button" onClick={onSearchHandler} className="button">
              Search
            </button>
          </div>
        )
      }}
    </MovieContext.Consumer>
  )
  return (
    <nav className="navbar-container">
      <h1 className="navbar-heading">movieDB</h1>
      <ul className="nav-items-list">
        <li className="list-item">
          <Link className="nav-link" to="/">
            Popular
          </Link>
        </li>
        <li className="list-item">
          <Link className="nav-link" to="/top-rated">
            Top Rated
          </Link>
        </li>
        <li className="list-item">
          <Link className="nav-link" to="/upcoming">
            Upcoming
          </Link>
        </li>
      </ul>
      {renderSearchBar()}
    </nav>
  )
}
export default withRouter(Navbar)
