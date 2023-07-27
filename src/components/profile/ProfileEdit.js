import { useEffect, useState } from "react"

export const ProfileEdit = ({ trigger, setTrigger, profileId, getProfile }) => {
    const [profile, updateProfile] = useState({
        userName: "",
        email: "",
        password: "",
        profilePic: "",
        bio: ""
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/users/${profileId}`)
                .then(res => res.json())
                .then(data => {
                    updateProfile(data)
            })
        },
        []
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
            .then(data => {
                setTrigger(false)
                getProfile()
        })
    }

    return (trigger) ?
    (
        <div className="popupForm">
            <div className="popup-inner">
                <button className="close-button"
                    onClick={() => setTrigger(false)}
                >Close</button>
                <form className="profileEditForm">
                    <h2 className="profileEditForm-title">Edit Profile</h2>
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
    )
    :
    ""
}