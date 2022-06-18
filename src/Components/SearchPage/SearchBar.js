import PropTypes from 'prop-types'
import { LinkButton } from '../Buttons/LinkButton'
import { SearchBarInput } from './SearchBarInput'

export const SearchBar = (props) => {

    const handleSearch = (eve) => {
        props.updateQuery(eve.target.value)
    }
    return (
        <div className="search-books-bar">
            <LinkButton
                text='close'
                url='/'
            />
            <SearchBarInput
                query={props.query}
                handleSearch={handleSearch}
            />
        </div>
    )
}

SearchBar.propTypes = {
    query: PropTypes.string,
    updateQuery: PropTypes.func.isRequired
}