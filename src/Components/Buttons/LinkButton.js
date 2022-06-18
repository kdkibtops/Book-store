import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

export const LinkButton = (props) => {

    return (
        <Link
            to={{
                pathname: `${props.url}`,
            }}
            className="close-search"
        >
            {props.text || ''}
        </Link>
    )
}

LinkButton.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string
}