import { Link } from "react-router-dom"

export const Resort = ({ resortObject }) => {


    return <section className="resort">
        <header>
            <Link to={`/${resortObject.slug}/parks`}>{resortObject.name}</Link>
        </header>
    </section>
}