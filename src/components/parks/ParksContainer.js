import { useState } from "react"
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { ParkSearch } from "./ParkSearch"
import { ParksList } from "./ParksList"
import { ParkSortBar } from "./ParkSortBar"

export const ParksContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
    <ParkSortBar />
        <header className="parks-header">
            <span className="parks-headerTitle">Select your Park</span>
            <ParkSearch setterFunction={setSearchTerms}/>
        </header>
        <ParksList searchTermState={searchTerms}/>
    </>
}