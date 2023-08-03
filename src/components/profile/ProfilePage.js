import { useEffect, useState } from "react"
import './Profile.css'
import { ProfileEdit } from "./ProfileEdit"
import { ProfilePic } from "./ProfilePic"
import { ReactComponent as LocationPin } from "./icons/locationPin.svg"

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
        <article className="profile">
            <section className="profile__leftSideBar">
                <ProfilePic userProfilePicId={user.imageId} width='75px' height='75px'/>
                <header className="profile__userName">{user.userName}</header>
                {editProfileButton()}
                <div className="profile__location">
                    <svg 
                    aria-hidden="true" 
                    width="13" 
                    height="13" >
                        <LocationPin />
                    </svg>
                    {user.location}
                </div>
            </section>
            <section className="profile__center">
                <div className="profile__bio">
                    {
                        (user.bio)
                        ? user.bio
                        :
                        "Bio empty"
                    }
                </div>
                
                <div className="profile__activity">Profile Activity</div>
                
            </section>
            <section className="profile__rightSideBar">
                <div>Favorites</div>
            </section>
        </article>
        </>
    )
}