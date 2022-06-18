import { AddBook } from "./AddBook"
import { BookShelf } from "./BookShelf"
import { Title } from "./Title"

export const MyReads = (props) => {
    const srcbooks = props.library
    const currentlyReading = srcbooks.filter(book => book.shelf === `currentlyReading`);
    const wantToRead = srcbooks.filter(book => book.shelf === `wantToRead`);
    const toRead = srcbooks.filter(book => book.shelf === `read`);
    const nil = srcbooks.filter(book => book.shelf === `nil`);
    const library = [currentlyReading, wantToRead, toRead, nil];

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
                                    case 'nil':
                                        shelfName = 'nil'
                                        break;
                                    default:
                                        shelfName = 'nil'
                                        break;
                                }
                                if (shelfName !== 'nil') {
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
            <AddBook />
        </div>
    )
}
