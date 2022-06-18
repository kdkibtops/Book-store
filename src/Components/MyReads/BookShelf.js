import PropTypes from 'prop-types'
import { BookShelfTitle } from './BookShelf/BookShelfTitle'
import { ShelfBooks } from './BookShelf/ShelfBooks'

export const BookShelf = (props) => {
    return (
        <div className="bookshelf">
            <BookShelfTitle
                text={props.title}
            />
            <ShelfBooks
                booklist={props.bookList}
                changeShelf={props.changeShelf}
            />
        </div>
    )
}
BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}