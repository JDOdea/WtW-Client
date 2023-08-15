import { useEffect, useState } from "react";
import { Favorite } from "./Favorite";

export const FavoriteResorts = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(
        () => {
        fetch(`http://localhost:8088/favorites`)
            .then(res => res.json())
            .then(data => {
                setFavorites(data)
        })
        },
        []
    )

    return (
        <article  className="favoriteResorts">
            <span className="favorites-headerTitle">Favorites</span>
            {
                favorites.map(
                    (favorite) => <Favorite 
                    favoriteObject={favorite}
                    key={`${favorite.id}`}
                    />
                )
            }
        </article>
    )
}