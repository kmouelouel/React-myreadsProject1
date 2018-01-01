import React, { Component } from 'react'
import Book from './Book'


class BookShelf extends Component {
    render() {
        const { books, bookshelfTitle, updateShelf,shelf} =this.props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.filter(book=>book.shelf === shelf).map(bookshelf => (
                        <li key={bookshelf.id}>
                            <Book updateShelf={updateShelf} bookshelf={bookshelf} />
                        </li>
                    ))}              
                </ol>
            </div>
        </div>
    );
}
}
export default BookShelf