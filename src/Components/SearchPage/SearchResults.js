import PropTypes from 'prop-types'
import { BookComponent } from "../MyReads/BookShelf/BookComponent"

export const SearchResults = (props) => {
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {
                    props.library.map((book) => {
                        return <BookComponent
                            key={book.bookTitle}
                            bookTitle={book.bookTitle}
                            url={book.url}
                            shelf={book.shelf}
                            bookAuthors={book.bookAuthors}
                            changeShelf={props.changeShelf}
                        />
                    })
                }
            </ol>
        </div>
    )
}

SearchResults.propTypes = {
    library: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}