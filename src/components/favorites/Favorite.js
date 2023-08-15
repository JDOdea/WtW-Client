import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Favorite = ({ favoriteObject }) => {
    const [favorite, setFavorite] = useState({});

    useEffect(
        () => {
            fetch(`https://api.themeparks.wiki/v1/entity/${favoriteObject.entityId}`)
                .then(res => res.json())
                .then(data => {
                    setFavorite(data)
            })
        },
        []
    )

    return <section className="favorite">
        <Link to={`/${favorite.slug}/parks`}>{favorite.name}</Link>
    </section>
}