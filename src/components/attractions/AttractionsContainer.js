import { useState } from "react"
import { AttractionSearch } from "./AttractionSearch"
import { AttractionsList } from "./AttractionsList"
import { FavoriteAttractions } from "../favorites/FavoriteAttractions"

export const AttractionsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <header className="attractions-header">
            <span className="attractions-headertitle">Select an Attraction</span>
        <AttractionSearch setterFunction = {setSearchTerms}/>
        </header>
        <div className="attractionsPage">
            <AttractionsList searchTermState = {searchTerms}/>
            <FavoriteAttractions />
        </div>
    </>
}