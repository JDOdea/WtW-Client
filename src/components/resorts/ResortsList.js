import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Resort } from "./Resort"

export const ResortsList = ({ searchTermState }) => {
    const [resorts, setResorts] = useState([])
    const [filteredResorts, setFiltered] = useState([])
    const navigate = useNavigate()

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    useEffect(
        () => {
            const searchedResorts = resorts.filter(resort => {
                if (!searchTermState) {
                    return []
                } else {
                    return resort.name.toLowerCase().includes(searchTermState.toLowerCase())
                }
            })
            setFiltered(searchedResorts)
        },
        [searchTermState]
    )

    // Function to get all resorts
    const getAllResorts = () => {
        fetch(`https://api.themeparks.wiki/v1/destinations`)
            .then(res => res.json())
            .then((data) => {
                setResorts(data.destinations)
            
        })
    }

    // Initial useEffect
    useEffect(
        () => {
            getAllResorts()
        },
        []
    )

    // useEffect to setFiltered parks
    useEffect(
        () => {
            setFiltered(resorts)
        },
        [resorts]
    )
    

    return (
        <>
        <h2>List of Resorts</h2>
        <article className="resorts">
            {
                filteredResorts.map(
                    (resort) => <Resort
                    resortObject={resort}
                    currentUser={waitUserObject}
                    key={`${resort.id}`}
                    />
                )
            }
        </article>
        </>
    )
}