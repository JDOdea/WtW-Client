import { useState } from "react"
import { ParkSearch } from "./ParkSearch"
import { ParksList } from "./ParksList"

export const ParksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ParkSearch setterFunction={setSearchTerms}/>
        <ParksList searchTermState={searchTerms}/>
    </>
}