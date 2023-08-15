import { useEffect, useState } from "react";
import { Attraction } from "../attractions/Attraction";



export const FavoriteAttraction = ({ favoriteObject }) => {
    const [favorite, setFavorite] = useState({});
    const [attraction, setAttraction] = useState({});
    const [park, setPark] = useState({});

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

    useEffect(
        () => {
            if (favorite.parkId) {
                fetch(`https://api.themeparks.wiki/v1/entity/${favorite.parkId}`)
                    .then(res => res.json())
                    .then(data => {
                        setPark(data)
                })
            }

            
        },
        [favorite]
    )

    return <section className="favorite">
        <Attraction 
        parkSlug={park.slug}
        attractionobject={favorite}
        />
    </section>
}