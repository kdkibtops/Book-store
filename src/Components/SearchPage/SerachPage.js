import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import PropTypes from 'prop-types';


export const SerachPage = (props) => {
    const query = props.query;
    //  function to filter books by Authors according to the query
    function filterBookByAuthor(book, query_string) {
        let including = false
        if (book.authors) {
            book.authors.forEach(author => {
                if (!including) {
                    if (author.toLowerCase().includes(query_string.toLowerCase())) {
                        including = true;
                    }
                }
            }
            )
        }
        return including;
    }
    // Create a set of matching books by title or by authors to avoid multiplications
    const resultsSet = query === ''
        ? new Set(props.library)
        : new Set([...props.library.filter((book) => {
            return book.title.toLowerCase().includes(query.toLowerCase())
        }), ...props.library.filter((book) => {
            return filterBookByAuthor(book, query)
        })]
        )


    // convert the set of matching books back to array to iterate over it
    const results = Array.from(resultsSet);

    const updateQuery = (query_string) => {
        props.searchBooks(query_string);
    }
    const clearQuery = () => {
        props.clearQuery();
    }

    return (
        <div className="search-books">
            <div>
                <SearchBar
                    updateQuery={updateQuery}
                    query={query}
                />
            </div>
            {results.length !== 0 && props.query !== '' &&
                <div className="search-books-showing">
                    <span>{`Found ${results.length} books`}
                        <button onClick={() => { clearQuery() }}>Show my library</button>
                    </span>
                </div>
            }
            {
                results.length === 0 && props.query !== '' &&
                <div className="search-books-showing">
                    <span>No results found!
                        <button onClick={() => { clearQuery() }}>Show my library</button>
                    </span>
                </div>
            }
            {/* {results.length !== 0 && props.query === '' &&
                <div className="search-books-showing">
                    <span><h2> {`Your current library contains ${results.length} books`}</h2>
                    </span>
                </div>
            } */}
            {
                props.query === '' &&
                <div className="search-books-showing">
                    <span><h2> {`Your current library contains ${props.mainLibrary.length} books`}</h2>
                    </span>
                </div>
            }
            {
                props.query === '' &&
                <SearchResults
                    library={props.mainLibrary}
                    changeShelf={props.changeShelf}
                />
            }
            {props.query !== '' &&
                < SearchResults
                    library={results}
                    changeShelf={props.changeShelf}
                />
            }
        </div >
    )
}
SerachPage.propTypes = {
    library: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
}
