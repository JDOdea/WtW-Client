import { useState } from "react"
import { AttractionSearch } from "./AttractionSearch"
import { AttractionsList } from "./AttractionsList"

export const AttractionsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <header className="attractions-header">
            <span className="attractions-headertitle">Select an Attraction</span>
        <AttractionSearch setterFunction = {setSearchTerms}/>
        </header>
        <AttractionsList searchTermState = {searchTerms}/>
    </>
}