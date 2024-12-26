import {createContext} from 'react'

const MoviesContext = createContext({
  searchResponse: {},
  onTriggerSearchQuery: () => {},
})
export default MoviesContext
