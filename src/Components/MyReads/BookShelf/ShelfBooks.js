import { useState } from "react"
import { BookComponent } from "./BookComponent"
import PropTypes from 'prop-types'


export const ShelfBooks = (props) => {
    const [books] = useState(props.booklist);
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    books.map((book) => {
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

ShelfBooks.propTypes = {
    booklist: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}