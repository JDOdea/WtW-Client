import { useEffect, useState } from "react"

export const Profile = ({ userId }) => {
    const [user, setUser] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${userId}`)
                .then(res => res.json())
                .then((data) => {
                    setUser(data)
            })
        },
        []
    )

    return (
        <span>{user.userName}</span>
    )
}