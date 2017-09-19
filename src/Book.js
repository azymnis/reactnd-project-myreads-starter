import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array
  }

  render() {
    const {imageUrl, title, authors} = this.props

    return (
      <div className="book">
        <div className="book-top">
          {imageUrl && (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageUrl}")` }}></div>) }
          <div className="book-shelf-changer">
            <select>
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
  }
}

export default Book
