import { useEffect, useState } from "react"
import { ReactComponent as CaretIcon } from "../nav/icons/caret.svg"
import { ResortSortItem } from "./ResortSortItem";


export const ResortSortBar = ({ resortOptions, dropdownSetter }) => {
    const [resorts, setResorts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [hover, setHover] = useState("false");

    const toggleHover = () => setHover(!hover)

    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then(data => {
                    setCategories(data)
            })
        },
        []
    )

    useEffect(
        () => {
            setResorts(resortOptions)
        },
        [resortOptions]
    )



    return (
        <div className="resorts-bar">
            <div className="resort-dropdown"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >
            <a href="#" >
                Sort By Category
                <svg aria-hidden="true" 
                width="15" 
                height="15" 
                className="resort-dropdown-icon">
                    <CaretIcon />
                </svg>
            </a>
            {hover && (
                <div className="resort-dropdown-content">
                    {
                        categories.map((category) => {
                            return (
                                <ResortSortItem 
                                categoryObject={category}
                                key={`resort-dropdown--${category.id}`}
                                />
                            )
                        })
                    }
                </div>
            )}
        </div>
        </div>
    )
}