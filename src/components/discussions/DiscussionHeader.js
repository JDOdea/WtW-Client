import { Link } from "react-router-dom"
import { ReactComponent as DiscussionIcon } from "./icons/discussion.svg"
import { useEffect, useState } from "react"
import { ProfilePic } from "../profile/ProfilePic"

export const DiscussionHeader = ({ discussionObject, userArray }) => {
    const [poster, setPoster] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${discussionObject.posterId}`)
                .then(res => res.json())
                .then(data => {
                    setPoster(data)
            })
        },
        []
    )


    return (
        <>
            <li className="list-item">
                <div className="item-inner">
                    <div className="item-col-icon">
                        <i className="icon-text-document-inverted"><DiscussionIcon /></i>
                    </div>
                    <div className="item-col-main">
                        <a className="item-title" href={`/discussions/${discussionObject.id}`}>
                            <header>{discussionObject.title}</header>
                        </a>
                    </div>
                    <div className="item-col-lastpost">
                        <a className="item-lastpost__user" href="">{poster.userName}</a>
                        <span className="item-lastpost__avatar">
                            <ProfilePic 
                            userProfilePicId={poster.imageId}
                            width={30}
                            height={30}
                            />
                        </span>
                        {/* <span className="item-lastpost__time">Created 
                            <time dateTime={discussionObject.datePosted}> Date</time>
                        </span> */}
                    </div>
                </div>
            </li>
        </>
    )
}