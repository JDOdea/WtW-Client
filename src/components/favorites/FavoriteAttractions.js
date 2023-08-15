import { useEffect, useState } from "react";
import { FavoriteAttraction } from "./FavoriteAttraction";

export const FavoriteAttractions = () => {
    const [favorites, setFavorites] = useState([]);

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/favoriteAttractions?userId=${waitUserObject.id}`)
                .then(res => res.json())
                .then(data => {
                    setFavorites(data)
            })
        },
        []
    )

    return (
        <article className="favoriteAttractions">
            <span className="favorites-headerTitle">Favorites</span>
            {
                favorites.map(
                    (favorite) => <FavoriteAttraction
                    favoriteObject={favorite}
                    key={`${favorite.id}`}
                    />
                )
            }
        </article>
    )
}