import PropTypes from 'prop-types'

export const BookShelfTitle = (props) => {
    return (
        <h2
            className="bookshelf-title">
            {props.text}
        </h2>

    )
}
BookShelfTitle.propTypes = {
    text: PropTypes.string.isRequired
}