import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';
import BookShelf from './Bookshelf';
import * as BooksAPI from '../BooksAPI';

class ListBooks extends Component {
    state = {
        books: [],
    };
    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books,
            });
        });
    }
    updateShelf = (book, shelf) => {
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(shelves => {
                book.shelf = shelf;
                this.setState(state => ({
                    books: state.books.filter(each => each.id !== book.id).concat([book]),
                }));
            });
        }
    };
   
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books={this.state.books} bookshelfTitle="Currently Reading" updateShelf={this.updateShelf} shelf="currentlyReading"/>
                        <BookShelf books={this.state.books} bookshelfTitle="Want to Read" updateShelf={this.updateShelf} shelf="wantToRead"/>
                        <BookShelf books={this.state.books} bookshelfTitle="Read" updateShelf={this.updateShelf} shelf="read"/>

                    </div>
                </div>
                <div className="open-search">
                    <Link  to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default ListBooks;