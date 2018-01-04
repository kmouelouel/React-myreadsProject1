import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class Search extends Component {
    state = {
        searchResult: [],
        query: '',
        isLoading: false,
        noResult:false
    }
  
    onInputChange = (event) => {  
        this.setState({ query: event.target.value });
        this.fetchSearchResult(event.target.value);
    }
   
    fetchSearchResult = async (query) => {  
        if (query.length > 0) { 
            this.setState({ isLoading: true });
            try {
                const data = await BooksAPI.search(query, 20); 
                this.setState({
                    searchResult: Array.isArray(data) ? data : [],
                    noResult: Array.isArray(data) ? false : true,
                });
               
            } catch (err) {
                this.setState({
                    searchResult: [],
                    noResult: true,
                    isLoading:false
                }); 
            }
            setTimeout(() => {
                this.setState({
                    isLoading: false,
                });
            }, 500);
        } else {  
            this.setState({
                searchResult: [],
                 noResult: false
            }); 
        }
        
    }
     
    updateShelf = async (book, shelf) => { 
        await BooksAPI.update(book, shelf) 
    }
    render() {
        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.onInputChange}  value={this.state.query} />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.isLoading ? (
                        <div><h3>Please Wait...</h3><h4> While We are searching for data related to you input {this.state.query}.</h4></div>
                    ) : this.state.noResult ? (
                            <div><h3>Sorry!!! No Results Found For {this.state.query}.</h3> </div>
                    ) : (
                                <ol className="books-grid">

                                    {this.state.searchResult.map(bookshelf => (
                                        <li key={bookshelf.id}>
                                            <Book updateShelf={this.updateShelf} bookshelf={bookshelf} shelf={bookshelf.shelf} searchBook="true" />
                                        </li>
                                    ))}
                                </ol>
                            )}
                </div>
            </div>
        );
    }
}

export default Search;