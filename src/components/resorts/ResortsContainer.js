import { useState } from "react"
import "./Resorts.css"
import { ResortSearch } from "./ResortSearch"
import { ResortsList } from "./ResortsList"
import { ResortSortBar } from "./ResortSortBar"

export const ResortsContainer = () => {
    const [resorts, setResorts] = useState([]);
    const [searchTerms, setSearchTerms] = useState("")
    const [dropDownTerm, setDropDownTerm] = useState("");

    return <>
    <ResortSortBar resortOptions={resorts} dropdownSetter={setDropDownTerm}/>
        <header className="resorts-header">
            <span className="resorts-headerTitle">Select your Destination</span>
            <ResortSearch setterFunction = {setSearchTerms}/>
        </header>
        <ResortsList resortsSetter={setResorts} dropdownTerm={dropDownTerm} searchTermState = {searchTerms}/>
    </>
}