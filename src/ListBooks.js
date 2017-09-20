import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class ListBooks extends Component {
  state = {
    shelves: {}
  }

  shelfDescriptions = [
    {key: "currentlyReading", description: "Currently Reading"},
    {key: "wantToRead", description: "Want to Read"},
    {key: "read", description: "Read"}
  ]

  componentDidMount() {
    BooksAPI.getAll().then(existingBooks => {
      const shelves = {}
      this.shelfDescriptions.forEach(desc => shelves[desc.key] = [])
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
    return (<div className="bookshelf" key={shelf}>
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
                onChangeShelf={(newShelf) => this.moveBook(book, shelf, newShelf)}
              />
             </li>)
          )}
        </ol>
      </div>
    </div>)
  }

  moveBook = (currentBook, currentShelf, newShelf) => {
    this.setState( prevState => {
      const newState = { shelves: {} }
      this.shelfDescriptions.forEach( desc => {
        const prevShelf = prevState.shelves[desc.key]
        if (desc.key === currentShelf) {
          newState.shelves[desc.key] = prevShelf.filter ( book =>
            book.id !== currentBook.id
          )
        } else if (desc.key === newShelf) {
          newState.shelves[desc.key] = prevShelf.concat([currentBook])
        } else {
          newState.shelves[desc.key] = prevShelf
        }
      })
      return newState
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelfDescriptions.map(desc =>
              this.generateBookShelf(desc.key, desc.description)
            )}
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
