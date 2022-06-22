import { LinkButton } from "../Buttons/LinkButton"

export const AddBook = (props) => {
    return (
        <div className="open-search">
            <LinkButton
                url="/search"
                text='Add book'
                clearQuery={props.clearQuery}
            />
        </div>
    )
}
