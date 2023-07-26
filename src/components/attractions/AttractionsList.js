import { useEffect, useState } from "react"
import "./Attractions.css"
import { useNavigate, useParams } from "react-router-dom"
import { Attraction } from "./Attraction"

export const AttractionsList = ({ searchTermState }) => {
    const [attractions, setAttractions] = useState([])
    const [filteredAttractions, setFiltered] = useState([])
    const {resortSlug} = useParams()
    const {parkSlug} = useParams()
    const navigate = useNavigate()

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    // Function to get all attractions
    const getAllAttractions = () => {
        fetch(`https://api.themeparks.wiki/v1/entity/${parkSlug}/children`)
            .then(res => res.json())
            .then((data) => {
                const foundAttractions = data.children.filter((attraction) => {
                    return attraction.entityType === "ATTRACTION"
                })
                setAttractions(foundAttractions)
        })
    }

    // Initial useEffect
    useEffect(
        () => {
            getAllAttractions()
        },
        []
    )

    // useEffect to setFiltered attractions
    useEffect(
        () => {
            setFiltered(attractions)
        },
        [attractions]
    )

    return (
        <>
        <h2>List of Attractions</h2>
        <article className="attractions">
            {
                filteredAttractions.map(
                    (attraction) => <Attraction 
                    parkSlug={parkSlug}
                    attractionObject={attraction}
                    currentUser={waitUserObject}
                    key={`${attraction.id}`}
                    />
                )
            }
        </article>
        </>
    )
}