import { useEffect, useState } from "react"
import { Resort } from "./Resort"

export const ResortsList = ({ resortsSetter, dropdownTerm, searchTermState }) => {
    const [resorts, setResorts] = useState([])
    const [filteredResorts, setFiltered] = useState([])


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
            // Alphabetize 
            resorts.sort((a, b) => {
                const x = a.slug.toLowerCase()
                const y = b.slug.toLowerCase()
                if (x < y) {return -1}
                if (x > y) {return 1}
                return 0
            })

            resortsSetter(resorts.map((resort) => {
                return resort
            }))

            setFiltered(resorts)
        },
        [resorts]
    )
    

    return (
        <>
        
        <article className="resorts">
            {
                filteredResorts.map(
                    (resort) => <Resort
                    resortObject={resort}
                    key={`${resort.id}`}
                    />
                )
            }
        </article>
        <button onClick={() => {}} className="btn-top" title="Go to top">Top</button>
        </>
    )
}