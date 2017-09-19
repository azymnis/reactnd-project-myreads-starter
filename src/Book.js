import React from 'react'
import PropTypes from 'prop-types'

const Book = ({imageUrl, title, authors, shelf, onChangeShelf}) => (
  <div className="book">
    <div className="book-top">
      {imageUrl && (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageUrl}")` }}></div>) }
      <div className="book-shelf-changer">
        <select value={shelf || "none"} onChange={(event) => onChangeShelf(event.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{title}</div>
    {authors && (<div className="book-authors">{authors.join(", ")}</div>)}
  </div>
)

Book.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  shelf: PropTypes.oneOf(["wantToRead", "currentlyReading", "read"]),
  onChangeShelf: PropTypes.func.isRequired
}

export default Book
