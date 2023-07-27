import "./Discussions.css"
import { DiscussionHeader } from "./DiscussionHeader"

export const DiscussionList = ({ discussions }) => {

    /* if (!discussionsArray.length) {
        return <button>Start a Discussion</button>
    } else {
        return 
    } */

    return (
        <>
            <button>Start a Discussion</button>
            <h2>Discussions:</h2>
            <article className="discussions">
                {
                    discussions.map(
                        (discussion) => <DiscussionHeader
                        discussionObject={discussion}
                        key={`discussion--${discussion.id}`}
                        />
                    )
                }
            </article>
        </>
    )

}