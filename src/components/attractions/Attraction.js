import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const Attraction = ({ parkSlug, attractionobject, currentUser }) => {
    const [attraction, setAttraction] = useState({});
    const [slug, setSlug] = useState('');

    useEffect(
        () => {
            if (attraction.name) {
                const name = attractionobject.name.replace(/ /g, '')
                const lowerCaseName = name.toLowerCase()
                const justLetters = lowerCaseName.replaceAll(/\W/g, '')

                setSlug(justLetters)
                setAttraction(attractionobject)
            }
        },
        []
    )
    

    return <section className="attraction">
        <header>
            <Link to={`/${parkSlug}/${attractionobject.id}`} >{attractionobject.name}</Link>
        </header>
    </section>
}