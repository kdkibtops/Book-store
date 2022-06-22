import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

export const LinkButton = (props) => {

    return (
        <Link
            to={
                {
                    pathname: `${props.url}`,
                }
            }
            className="close-search"
            onClick={() => {
                if (props.clearQuery) {
                    props.clearQuery();
                }
            }}
        >
            {props.text || ''}
        </Link>
    )
}

LinkButton.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string
}