import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
    state = {
        searchResult: []
    }
    onInputChange = (event)=>{
       this.fetchSearchResult(event.target.value) 
    }
    fetchSearchResult = async (query) => {
        if (query.length > 0) {
            try {
                const data = await BooksAPI.search(query, 5);
                this.setState({
                    searchResult: data 
                });
                 
            } catch (err) {
                if (err) {
                   console.log(err);
                }
            }
        }
   }
    updateShelf =async (book, shelf)=>{
        await BooksAPI.update(book,shelf)
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.onInputChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResult.map(bookshelf => (
                            <li key={bookshelf.id}>
                                <Book updateShelf={this.updateShelf} bookshelf={bookshelf} />
                            </li>
                        ))}   
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;