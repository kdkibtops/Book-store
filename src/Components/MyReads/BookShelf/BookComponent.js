import PropTypes from 'prop-types'


export const BookComponent = (props) => {

    return (
        <li>
            <div className="book">
                <BookTop
                    book={props._book}
                    changeShelf={props.changeShelf}
                />
                <BookTitle bookTitle={props._book.title} />
                <BookAuthors bookAuthors={props._book.authors} />
            </div>
        </li>
    )
}
BookComponent.propTypes = {
    _book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

const BookTop = (props) => {
    const url = props.book.imageLinks
        ? `url("${props.book.imageLinks.smallThumbnail}")`
        : `url("../../icons/noprev.png")`
    return (
        <div className="book-top">
            <BookCover
                url={url}

            />
            <BookShelfChanger
                book={props.book}
                shelf={props.book.shelf}
                changeShelf={props.changeShelf}
            />
        </div>
    )
}
BookTop.propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

const BookCover = (props) => {

    return (
        <div
            className="book-cover"
            style={{
                width: 128,
                height: 193,
                backgroundImage: props.url
            }}

        ></div>
    )
}
BookCover.propTypes = {
    url: PropTypes.string
}

const BookShelfChanger = (props) => {
    const changeShelf = (eve) => {
        props.changeShelf(props.book, eve.target.value)
    }
    return (
        <div className="book-shelf-changer">
            <select defaultValue={props.book.shelf ? props.book.shelf : 'none'}
                onChange={(eve) => { changeShelf(eve) }}
            >
                <option
                    value="moveto"
                    disabled>
                    Move to...
                </option>
                <option
                    value="currentlyReading"
                >
                    Currently Reading
                </option>
                <option
                    value="wantToRead"
                >
                    Want to Read</option>
                <option
                    value="read"
                >
                    Read
                </option>
                <option
                    value="none"
                >
                    None
                </option>
            </select>
        </div>
    )
}
BookShelfChanger.propTypes = {
    shelf: PropTypes.string,
    changeShelf: PropTypes.func.isRequired
}

const BookTitle = (props) => {
    return (
        <div className="book-title">{props.bookTitle}</div>
    )
}
BookTitle.propTypes = {
    bookTitle: PropTypes.string.isRequired
}

const BookAuthors = (props) => {
    return (
        <div className="book-authors">{props.bookAuthors}</div>
    )
}
BookAuthors.propTypes = {
    bookAuthors: PropTypes.array
}