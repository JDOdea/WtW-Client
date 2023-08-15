import { useEffect, useState } from "react"
import { ProfilePic } from "../../profile/ProfilePic"

export const Comment = ({ commentObject }) => {
    const [user, setUser] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${commentObject.posterId}`)
                .then(res => res.json())
                .then((data) => {
                    setUser(data[0])
            })
        },
        []
    )

    return (
        <>
            <d1 className="post-profile">
                <dt className="username">{user.userName}</dt>
                <dt className="avatar-container">
                    <i className="icon-avatar">
                        <ProfilePic 
                        userProfilePicId={user.imageId}
                        width={44}
                        height={44}
                        />
                    </i>
                </dt>
            </d1>
            <div className="post-body">
                <ul className="post-buttons"></ul>
                {/* <p className="author" title="Date of post">
                    Date
                </p> */}
                <div className="content">
                    {commentObject.message}
                </div>
                <div className="signature"></div>
            </div>
        </>
    )
}