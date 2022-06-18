import { useState } from "react"
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import PropTypes from 'prop-types';

export const SerachPage = (props) => {
    const [query, setQuery] = useState('');

    const results = query === ''
        ? props.library
        : [...props.library.filter((book) => {
            return book.bookTitle.toLowerCase().includes(query.toLowerCase())
        })]

    const updateQuery = (query_string) => {
        setQuery(query_string);
    }

    return (
        <div className="search-books">
            <SearchBar
                updateQuery={updateQuery}
                query={query}
                navigation={props.navigation}
            />
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
