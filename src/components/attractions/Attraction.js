import { Link } from "react-router-dom"

export const Attraction = ({ parkSlug, attractionObject, currentUser }) => {
    

    return <section className="attraction">
        <header>
            <Link to={`/${parkSlug}/${attractionObject.slug}/details`}>{attractionObject.name}</Link>
        </header>
    </section>
}