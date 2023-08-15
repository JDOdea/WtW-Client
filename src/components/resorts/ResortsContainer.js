import { useState } from "react"
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "./Resorts.css"
import { ResortSearch } from "./ResortSearch"
import { ResortsList } from "./ResortsList"
import { ResortSortBar } from "./ResortSortBar"
import { FavoriteResorts } from "../favorites/FavoriteResorts";

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
        <div className="resortPage">
            <ResortsList resortsSetter={setResorts} dropdownTerm={dropDownTerm} searchTermState = {searchTerms}/>
            <FavoriteResorts />
        </div>
    </>
}