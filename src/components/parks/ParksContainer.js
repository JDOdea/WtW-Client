import { useState } from "react"
import { ParkSearch } from "./ParkSearch"
import { ParksList } from "./ParksList"

export const ParksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <header className="parks-header">
            <span className="parks-headerTitle">Select your Park</span>
            <ParkSearch setterFunction={setSearchTerms}/>
        </header>
        <ParksList searchTermState={searchTerms}/>
    </>
}