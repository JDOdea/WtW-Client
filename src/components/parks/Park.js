import { Link } from "react-router-dom"

export const Park = ({ resortSlug, parkObject, currentUser }) => {


    return <section className="park">
        <header>
            <Link to={`/${resortSlug}/${parkObject.slug}/rides`}>{parkObject.name}</Link>
        </header>
    </section>
}