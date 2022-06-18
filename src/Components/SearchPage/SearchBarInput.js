import PropTypes from 'prop-types'

export const SearchBarInput = (props) => {
    return (
        <div className="search-books-input-wrapper">
            <input
                type="text"
                value={props.query}
                onChange={props.handleSearch}
                placeholder="Search by title, author, or ISBN"
            />
        </div>
    )
}

SearchBarInput.propTypes = {
    query: PropTypes.string,
    handleSearch: PropTypes.func.isRequired
}