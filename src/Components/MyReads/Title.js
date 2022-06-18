import PropTypes from 'prop-types'
export const Title = (props) => {
    return (
        <div className="list-books-title">
            <h1>{props.text}</h1>
        </div>
    )
}
Title.propTypes = {
    text: PropTypes.string.isRequired
}