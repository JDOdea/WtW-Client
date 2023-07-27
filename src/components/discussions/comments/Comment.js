import { useEffect, useState } from "react"

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
            <article className="comment">
                <section className="comment-user">
                    {user.userName}
                </section>
                <section className="comment-message">
                    {commentObject.message}
                </section>
            </article>
        </>
    )
}