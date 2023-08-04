import { useEffect, useState } from "react";
import { ReactComponent as CaretIcon } from "../nav/icons/caret.svg"

export const ResortSortItem = ({ categoryObject }) => {
    const [types, setTypes] = useState([]);
    const [typeHover, setTypeHover] = useState("false");

    const toggleHover = () => setTypeHover(!typeHover)

    useEffect(
        () => {
            fetch(`http://localhost:8088/categoryTypes?categoryId=${categoryObject.id}`)
                .then(res => res.json())
                .then(data => {
                    setTypes(data)
            })
        },
        []
    )

    return (
        <>
        <div 
        className="resort-dropdown resort-dropdown--align-left"
        onMouseEnter={() => setTypeHover(true)}
        onMouseLeave={() => setTypeHover(false)}
        >
            {categoryObject.categoryType}
            <svg aria-hidden="true" 
            width="13" 
            height="13" 
            className="resort-dropdown-icon">
                <CaretIcon />
            </svg>
        </div>
        </>
    )
}