import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Comment } from "./comments/Comment"

export const Discussion = () => {
    const [discussion, setDiscussion] = useState({})
    const [comments, setComments] = useState([])
    const [comment, updateComment] = useState({
        message: ""
    })
    
    const {discussionId} = useParams()

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    const handleLeaveCommentClick = (e) => {
        e.preventDefault()

        const commentToSendToAPI = {
            discussionId: discussionId,
            posterId: waitUserObject.id,
            message: comment.message,
            datePosted: ""
        }

        fetch(`http://localhost:8088/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentToSendToAPI)
        })
            .then(res => res.json())
            .then(comment.message = "")
            .then(() => { getComments() })
    }

    const getComments = () => {
        fetch(`http://localhost:8088/comments?discussionId=${discussionId}`)
                .then(res => res.json())
                .then((data) => {
                    setComments(data)
            })
    }


    useEffect(
        () => {
            getComments()

            fetch(`http://localhost:8088/discussions?id=${discussionId}`)
                .then(res => res.json())
                .then((data) => {
                setDiscussion(data[0])
            })
        },
        []
    )

    return (
        <>
            <div className="wait_forums">
                <div className="breadcrumbs-bar row">
                    <ol className="nav-breadcrumbs col">
                    Breadcrumbs
                        <li className="crumb"></li>
                    </ol>
                </div>
                <div className="post-list row constrain">
                    <div className="col">
                    <h1 className="discussionPage-header">{discussion.title}</h1>
                    </div>
                    <div className="post-list-group">
                        <article className="discussion">
                            {
                                comments.map((comment) => {
                                    return <div id={`comment-${comment.id}`} className="post">
                                        <Comment 
                                        commentObject={comment}
                                        key={`comment--${comment.id}`}
                                        />
                                    </div>
                                })
                            }
                        </article>
                    </div>
                    <form className="commentForm">
                        <h2 className="commentForm-title">Enter a Comment:</h2>
                        <fieldset>
                            <div className="form-group">
                                <input 
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Type out your comment..."
                                value={comment.message}
                                onChange={
                                    (e) => {
                                        const copy = {...comment}
                                        copy.message = e.target.value
                                        updateComment(copy)
                                    }
                                }
                                />
                            </div>
                        </fieldset>
                        <button
                            onClick={(e) => handleLeaveCommentClick(e)}
                        className="btn btn-comment"
                        >
                            Leave Comment
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}