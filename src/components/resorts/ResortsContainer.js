import { useState } from "react"
import { ResortSearch } from "./ResortSearch"
import { ResortsList } from "./ResortsList"

export const ResortsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ResortSearch setterFunction = {setSearchTerms}/>
        <ResortsList searchTermState = {searchTerms}/>
    </>
}