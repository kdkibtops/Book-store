import { AddBook } from "./AddBook"
import { BookShelf } from "./BookShelf"
import { Title } from "./Title"
import PropTypes from 'prop-types'

export const MyReads = (props) => {
    const srcbooks = props.library
    const currentlyReading = srcbooks.filter(book => book.shelf === `currentlyReading`);
    const wantToRead = srcbooks.filter(book => book.shelf === `wantToRead`);
    const toRead = srcbooks.filter(book => book.shelf === `read`);
    const none = srcbooks.filter(book => book.shelf === `none`);
    const library = [currentlyReading, wantToRead, toRead, none];

    return (
        <div className="list-books">
            <Title text='MyReads' />
            <div className="list-books-content">
                <div>
                    {
                        library.map((booklist) => {
                            if (booklist.length) {
                                let shelfName = ''
                                switch (booklist[0].shelf) {
                                    case 'currentlyReading':
                                        shelfName = 'Currently Reading'
                                        break;
                                    case 'wantToRead':
                                        shelfName = 'Want to Read'
                                        break;
                                    case 'read':
                                        shelfName = 'Read'
                                        break;
                                    case 'none':
                                        shelfName = 'none'
                                        break;
                                    default:
                                        shelfName = 'none'
                                        break;
                                }
                                if (shelfName !== 'none') {
                                    return (
                                        <BookShelf
                                            key={`${shelfName.length}+${booklist.length}`}
                                            title={shelfName}
                                            bookList={booklist}
                                            changeShelf={props.changeShelf}
                                        />
                                    )
                                }
                            }
                            return null;
                        })
                    }
                </div>
            </div>
            <AddBook clearQuery={props.clearQuery} />
        </div>
    )
}
MyReads.propTypes = {
    library: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}
