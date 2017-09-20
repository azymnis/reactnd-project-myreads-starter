import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  state = {
    shelves: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then(existingBooks => {
      const shelves = {
        wantToRead: [],
        currentlyReading: [],
        read: []
      }
      existingBooks.forEach( book => {
        if (book.shelf in shelves) {
          shelves[book.shelf].push(book)
        }
      })
      this.setState({ shelves })
    })
  }

  generateBookShelf = (shelf, shelfName) => {
    const books = this.state.shelves[shelf]
    return (<div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map( book =>
            (<li key={book.id}>
              <Book
                imageUrl={book.imageLinks ? book.imageLinks.thumbnail : undefined}
                authors={book.authors}
                title={book.title}
                shelf={shelf}
                onChangeShelf={(shelf) => console.log(shelf)}
              />
             </li>)
          )}
        </ol>
      </div>
    </div>)
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.generateBookShelf("currentlyReading", "Currently Reading")}
            {this.generateBookShelf("wantToRead", "Want to Read")}
            {this.generateBookShelf("read", "Read")}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
