import { Link } from "react-router-dom"

export const DiscussionHeader = ({ discussionObject }) => {
    return (
        <>
            <section className="discussion">
                <Link to={`/discussions/${discussionObject.id}`}>
                    <header>{discussionObject.title}</header>
                </Link>
            </section>
        </>
    )
}