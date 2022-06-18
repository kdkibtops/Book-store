import PropTypes from 'prop-types'

export const BookComponent = (props) => {
    return (
        <li>
            <div className="book">
                <BookTop url={props.url} shelf={props.shelf} changeShelf={props.changeShelf} />
                <BookTitle bookTitle={props.bookTitle} />
                <BookAuthors bookAuthors={props.bookAuthors} />
            </div>
        </li>
    )
}
BookComponent.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    bookAuthors: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

const BookTop = (props) => {
    return (
        <div className="book-top">
            <BookCover
                url={props.url}
            />
            <BookShelfChanger
                shelf={props.shelf}
                changeShelf={props.changeShelf}
            />
        </div>
    )
}
BookTop.propTypes = {
    url: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
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
    url: PropTypes.string.isRequired
}

const BookShelfChanger = (props) => {
    const changeShelf = (eve) => {
        props.changeShelf(eve.target.value)
    }
    return (
        <div className="book-shelf-changer">
            <select defaultValue={props.shelf}>
                <option
                    value="none"
                    disabled>
                    Move to...
                </option>
                <option
                    value="currentlyReading"
                    onClick={changeShelf}
                >
                    Currently Reading
                </option>
                <option
                    value="wantToRead"
                    onClick={changeShelf}

                >
                    Want to Read</option>
                <option
                    value="read"
                    onClick={changeShelf}

                >
                    Read
                </option>
                <option
                    value="nil"
                    onClick={changeShelf}

                >
                    None
                </option>
            </select>
        </div>
    )
}
BookShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
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
    bookAuthors: PropTypes.array.isRequired
}