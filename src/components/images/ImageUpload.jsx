import { useEffect, useState } from 'react';

export const ImageUpload = ({ profileObject, imageId, getProfilePic }) => {
    const [profile, setProfile] = useState();
    const [feedback, setFeedback] = useState("") // Upload confirmation


    useEffect(
        () => {
            if (feedback !== "") {
                // Clear feedback to make entire element disappear after 3 seconds
                setTimeout(() => setFeedback(""), 3000)
            }
        },
        [feedback]
    )

    useEffect(
        () => {
            setProfile(profileObject)
        },
        []
    )


    // Create user profile pic if none already
    const uploadImage = (imageData) => {
        // Post image in db
        fetch(`http://localhost:8088/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageData })
        })
            .then((res) => res.json())
            .then((data) => {
                // Confirm upload
                console.log('Image uploaded successfully:', data)
                // Create copy of profile and add imageId
                const copy = {...profile}
                copy.imageId = data.id

                // Edit json profile to add imageId
                fetch(`http://localhost:8088/users/${profile.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(copy)
                })
                    .then(res => res.json())
                    .then((res) => {
                })
            })
            .then(() => {
                setFeedback("Profile pic successfully saved")
                getProfilePic()
            })
            .catch((error) => {
                console.error('Error uploading image:', error)
            })
    }

    // Replace user profile pic
    const replaceImage = (imageData) => {
        fetch(`http://localhost:8088/images/${imageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageData })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Image replaced successfully:', data)
                setFeedback("Profile pic saved")
                getProfilePic()
            })
            .catch((error) => {
                console.error('Error replacing image:', error)
            })
    }

    // Handle form submit
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const fileInput = document.getElementById('imageInput')
        const file = fileInput.files[0]

        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                const imageData = reader.result
                if (imageId) {
                    replaceImage(imageData)
                } else {
                    uploadImage(imageData)
                }
            }

            reader.onerror = (error) => {
                console.error('Error reading the file:', error)
            }
        } else {
            console.error('No file selected')
        }
    }


    return (
        <>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <div className="form-group">
                <form onSubmit={handleFormSubmit}>
                    <h2 className="profileEditForm-title">Edit Profile</h2>
                    <input 
                        type="file" 
                        id="imageInput" 
                        name="file"
                        accept=".png, .jpeg, .jpg"
                    />
                    <button type='submit'>Update</button>
                </form>
            </div>
        </>
    )
}