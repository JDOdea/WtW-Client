import "./Discussions.css"
import { DiscussionHeader } from "./DiscussionHeader"
import { useEffect, useState } from "react"

export const DiscussionList = ({ discussions, attractionName }) => {
    const [users, setUsers] = useState([])
    

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then(data => {
                    setUsers(data)
            })
        },
        []
    )

    return (
        <>
            <div className="discussionsSection">
                <div className="thread-list row constrain">
                    <div className="discussion-header">
                        <h2>{attractionName} Discussions:</h2>
                    </div>
                    <button className="discussions-startButton" >Start a Discussion</button>
                    <ol className="list-group">
                        {
                            discussions.map(
                                (discussion) => <DiscussionHeader
                                discussionObject={discussion}
                                userArray={users}
                                key={`discussion--${discussion.id}`}
                                />
                            )
                        }
                    </ol>
                </div>
            </div>
        </>
    )

}