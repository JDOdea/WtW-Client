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
            setFiltered(parks)
        },
        [parks]
    )

    return (
        <>
        <h2>List of Parks</h2>
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