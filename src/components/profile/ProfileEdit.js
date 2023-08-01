import { useEffect, useState } from "react"
import { ImageUpload } from "../images/ImageUpload"
import { ProfilePic } from './ProfilePic';

export const ProfileEdit = ({ trigger, setTrigger, profileObject, profileId, getProfile }) => {
    const [imageUrl, setImageUrl] = useState('')
    const [profile, updateProfile] = useState({
        userName: "",
        email: "",
        password: "",
        bio: ""
    })

    const getProfilePic = () => {
        fetch(`http://localhost:8088/images`)
                .then(res => res.json())
                .then(data => {
                    const foundImage = data.find((image) => {
                        return image.id === profile.imageId
                    })
                    setImageUrl(foundImage?.imageData)
            })
    }

    useEffect(
        () => {
            getProfilePic()
        },
        [imageUrl]
    )

    useEffect(
        () => {
            getProfilePic()
        },
        [profile.imageId]
    )

    useEffect(
        () => {
            updateProfile(profileObject)
            
        },
        [profileObject]
    )
    

    const handleProfileUpdateClick = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8088/users/${profileId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(res => res.json())
            .then(() => {
                setTrigger(false)
                getProfile()
        })
    }




    return (trigger) ?
    (
        <>
            <div className="popupForm">
                <div className="popup-inner">
                    <button className="close-button"
                        onClick={() => setTrigger(false)}
                    >Close</button>
                    {imageUrl && 
                        <ProfilePic userProfilePicId={profile.imageId} width='100px' height='100px'/>
                    }
                    {
                        profile.imageId
                        ? < ImageUpload imageId={profile.imageId} getProfilePic={getProfilePic}/>
                        : < ImageUpload />
                    }
                    <form className="profileEditForm">
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="userName">Username:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={profile.userName}
                                    onChange={
                                        (e) => {
                                            const copy = {...profile}
                                            copy.userName = e.target.value
                                            updateProfile(copy)
                                        }
                                    }
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={profile.email}
                                    onChange={
                                        (e) => {
                                            const copy = {...profile}
                                            copy.email = e.target.value
                                            updateProfile(copy)
                                        }
                                    }
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    type="password"
                                    className="form-control"
                                    value={profile.password}
                                    onChange={
                                        (e) => {
                                            const copy = {...profile}
                                            copy.password = e.target.value
                                            updateProfile(copy)
                                        }
                                    }
                                />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="bio">Bio:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={profile.bio}
                                    onChange={
                                        (e) => {
                                            const copy = {...profile}
                                            copy.bio = e.target.value
                                            updateProfile(copy)
                                        }
                                    }
                                />
                            </div>
                        </fieldset>
                        <button
                            onClick={(e) => handleProfileUpdateClick(e)}
                        className="btn btn-primary">
                            Submit Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
    :
    ""
}