import React, { Component } from 'react'; 
import * as BooksAPI from '../BooksAPI'; 


class Book extends Component {
   state = {
        value: this.props.bookshelf.shelf || 'none',
    };

   componentDidMount() {
        if (this.props.searchBook) {
            this.getBookData();
        }
    }

    getBookData = async () => {
        const data = await BooksAPI.get(this.props.bookshelf.id);
        this.setState({ value: data.shelf}) 
         
    };
    
    render() {
        const { updateShelf, bookshelf } = this.props;
       return (            
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${bookshelf.imageLinks ? bookshelf.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover' }')` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.value}
                            onChange={event => updateShelf(bookshelf, event.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookshelf.title}</div>
                <div className="book-authors">{bookshelf.authors ? bookshelf.authors.join(', ') : ''}</div> 
            </div>
        );
    }
}

export default Book;
