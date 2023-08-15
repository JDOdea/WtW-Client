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
                <div className="profile__profilePic">
                    <ProfilePic userProfilePicId={user.imageId} width='75px' height='75px'/>
                </div>
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
                <div className="profile__bioBox">
                    <span className="profile__bio">
                        {
                            (user.bio)
                            ? user.bio
                            :
                            "Bio empty"
                        }
                    </span>
                </div>
                
                <div className="profile__activity">
                    <span className="profile__activityHeader">Recent Activity</span>
                    <div className="profile__activities">
                        <span className="profile__activityItem">
                            <span className="profile__activityText">Commented on illumiGreg's 'Seven Dwarves Mine Train' Discussion</span>
                        </span>
                        <span className="profile__activityItem">
                            <span className="profile__activityText">Posted an opinion on 'Men in Black: Alien Attack'</span>
                        </span>
                        <span className="profile__activityItem">
                            <span className="profile__activityText">Posted an opinion on 'TRON Lightcycle / Run'</span>
                        </span>
                        <span className="profile__activityItem">
                            <span className="profile__activityText">Started a discussion on 'Jurassic World River Adventure'</span>
                        </span>
                        <span className="profile__activityItem">
                            <span className="profile__activityText">Edited an opinion on 'Buzz Lightyear's Space Ranger Spin'</span>
                        </span>
                    </div>
                    </div>
                
            </section>
            <section className="profile__rightSideBar">
                <div>Favorites</div>
                <span className="profile__favorites">No public favorites to display</span>
            </section>
        </article>
        </>
    )
}