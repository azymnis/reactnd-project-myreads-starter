import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '', // Search form query text
    results: [], // Search results
    shelves: {} // Mapping of bookId to shelf name
  }

  /**
   * Populate the state of shelves by making an API call
   */
  componentDidMount() {
    BooksAPI.getAll().then(existingBooks => {
      const shelves = {}
      existingBooks.forEach( book =>
        shelves[book.id] = book.shelf
      )
      this.setState({ shelves })
    })
  }

  /**
   * Update results by making an API call
   */
  updateQuery = (query) => {
    const trimmedQuery = query.trim()
    query !== ''
    ? BooksAPI.search(query, 100).then(data => {
        if (data.error) {
          this.setState({results: [], query: trimmedQuery})
        } else {
          this.setState({results: data, query: trimmedQuery})
        }
      })
    : this.setState({results: [], query: trimmedQuery})
  }

  /**
   * Make an API call to modify a book's shelf and then update local state
   */
  moveBook = (bookId, shelf) => {
    BooksAPI.update({id: bookId}, shelf)
    this.setState(state => {
        const shelves = state.shelves
        shelves[bookId] = shelf
        return {shelves}
      }
    )
  }

  render() {
    const { query, results, shelves } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.map( result =>
              (<li key={result.id}>
                <Book
                  imageUrl={result.imageLinks ? result.imageLinks.thumbnail : undefined}
                  authors={result.authors}
                  title={result.title}
                  shelf={shelves[result.id]}
                  onChangeShelf={(shelf) => this.moveBook(result.id, shelf)}
                />
               </li>)
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
