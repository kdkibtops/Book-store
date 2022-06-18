import { useState } from "react"
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import PropTypes from 'prop-types';

export const SerachPage = (props) => {
    const [query, setQuery] = useState('');

    //  function to filter books by Authors according to the query
    function filterBookByAuthor(book, query_string) {
        let including = false
        book.bookAuthors.forEach(author => {
            if (!including) {
                if (author.toLowerCase().includes(query_string.toLowerCase())) {
                    including = true;
                }
            }
        }
        )
        return including;
    }
    // Create a set of matching books by title or by authors to avoid multiplications
    const resultsSet = query === ''
        ? new Set(props.library)
        : new Set([...props.library.filter((book) => {
            return book.bookTitle.toLowerCase().includes(query.toLowerCase())
        }), ...props.library.filter((book) => {
            return filterBookByAuthor(book, query)
        })]
        )
    // convert the set of matching books back to array to iterate over it
    const results = Array.from(resultsSet);

    const updateQuery = (query_string) => {
        setQuery(query_string);
    }
    const clearQuery = () => {
        setQuery('');
    }
    return (
        <div className="search-books">
            <div>
                <SearchBar
                    updateQuery={updateQuery}
                    query={query}
                    navigation={props.navigation}
                />
            </div>
            {results.length !== props.library.length && results.length !== 0 &&
                <div className="search-books-showing">
                    <span>Showing {results.length} books of {props.library.length}{' '}
                        <button onClick={() => { clearQuery() }}>Show all</button>
                    </span>
                </div>
            }
            {results.length !== props.library.length && results.length === 0 &&
                <div className="search-books-showing">
                    <span>No results found!
                        <button onClick={() => { clearQuery() }}>Show all books</button>
                    </span>
                </div>
            }
            <SearchResults
                library={results}
                changeShelf={props.changeShelf}
            />
        </div>
    )
}
SerachPage.propTypes = {
    library: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    navigation: PropTypes.func.isRequired
}
