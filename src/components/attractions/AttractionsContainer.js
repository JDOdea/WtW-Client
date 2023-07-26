import { useState } from "react"
import { AttractionSearch } from "./AttractionSearch"
import { AttractionsList } from "./AttractionsList"

export const AttractionsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <AttractionSearch setterFunction = {setSearchTerms}/>
        <AttractionsList searchTermState = {searchTerms}/>
    </>
}