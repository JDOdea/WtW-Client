import { useEffect, useState } from "react"
import "./Parks.css"
import { useNavigate, useParams } from "react-router-dom"
import { Park } from "./Park"

export const ParksList = ({ searchTermState }) => {

    const [parks, setParks] = useState([])
    const [filteredParks, setFiltered] = useState([])
    const {resortSlug} = useParams()
    const navigate = useNavigate()

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    useEffect(
        () => {
            const searchedParks = parks.filter(park => {
                if (!searchTermState) {
                    return []
                } else {
                    return park.name.toLowerCase().includes(searchTermState.toLowerCase())
                }
            })
            setFiltered(searchedParks)
        },
        [searchTermState]
    )

    // Function to get all theme parks
    const getAllParks = () => {
        fetch(`https://api.themeparks.wiki/v1/entity/${resortSlug}`)
            .then(res => res.json())
            .then(
                fetch(`https://api.themeparks.wiki/v1/entity/${resortSlug}/children`)
                    .then(res => res.json())
                    .then((data) => {
                        if (data.children) {
                            const foundParks = data.children.filter((park) => {
                                return park.entityType === "PARK"
                            })
                            setParks(foundParks)
                        } else {
                        }
                })
            )
    }

    // Initial useEffect
    useEffect(
        () => {
            getAllParks()
        },
        []
    )
    
    // useEffect to setFiltered parks
    useEffect(
        () => {
            // Alphabetize
            parks.sort((a, b) => {
                const x = a.slug.toLowerCase()
                const y = b.slug.toLowerCase()
                if (x < y) {return -1}
                if (x > y) {return 1}
                return 0
            })


            setFiltered(parks)
        },
        [parks]
    )

    return (
        <>
        <article className="parks">
            {
                filteredParks.map(
                    (park) => <Park 
                    resortSlug={resortSlug}
                    parkObject={park}
                    currentUser={waitUserObject}
                    key={`${park.id}`}/>
                )
            }
        </article>
        </>
    )
}