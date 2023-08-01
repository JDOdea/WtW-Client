import Image from 'react-bootstrap/Image'
import './ProfilePic.css'
import { useEffect, useState } from 'react';

export const ProfilePic = ({ userProfilePicId, width, height }) => {
    const [imageUrl, setImageUrl] = useState('')

    const getProfilePic = () => {
        fetch(`http://localhost:8088/images`)
                .then(res => res.json())
                .then(data => {
                    const foundImage = data.find((image) => {
                        return image.id === userProfilePicId
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
        [userProfilePicId]
    )

    if (!imageUrl) {
        return
    } else {
        return (
            <div>
                <Image 
                className='profile-picture'
                src={imageUrl} 
                alt='Profile picture'
                style={{ width: width, height: height }} 
                roundedCircle />
            </div>
        )
    }


    
}