import { useEffect, useState } from "react"
import './Profile.css'
import { ProfileEdit } from "./ProfileEdit"
import { ProfilePic } from "./ProfilePic"

export const ProfilePage = () => {
    const [user, setUser] = useState({})
    const [formPopup, setFormPopup] = useState(false)

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    const editProfileButton = () => {
        return <>
        <button onClick={() => {
            setFormPopup(true)
        }} className="profile__edit">Edit Profile</button>
        <ProfileEdit 
        trigger={formPopup}
        setTrigger={setFormPopup}
        profileObject={user}
        profileId={waitUserObject.id}
        getProfile={getProfile}/>
        </>
    }

    const getProfile = () => {
        fetch(`http://localhost:8088/users?id=${waitUserObject.id}`)
                .then(res => res.json())
                .then(data => {
                    setUser(data[0])
            })
    }

    useEffect(
        () => {
            getProfile()
        },
        []
    )

    return (
        <>
        <article>
            <section className="profile__header">
                <header>{user.userName}</header>
                <ProfilePic userProfilePicId={user.imageId} width='75px' height='75px'/>
                {editProfileButton()}
            </section>
            <section>
                <div>
                    {
                        (user.bio)
                        ? user.bio
                        :
                        "Bio empty"
                    }
                </div>
                <div>Profile Location</div>
                <div>Profile Activity</div>
            </section>
        </article>
        </>
    )
}