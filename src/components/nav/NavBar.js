import { useEffect, useState } from "react"
import "./NavBar.css"
import { NavItem } from "./NavItem"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { DropdownMenu } from "./DropdownMenu"
import { Link } from "react-router-dom"


export const NavBar = () => {
    const [user, setUser] = useState({})


    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?id=${waitUserObject.id}`)
                .then(res => res.json())
                .then((data) => {
                    const currentUser = data[0]
                    setUser(currentUser)
            })
        },
        []
    )

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to={`/`}>
                    WtW
                </Link>
            </div>
            <ul className="navbar-nav">
                <NavItem icon={<CaretIcon />} currentUserObject={user}>
                    <DropdownMenu currentUserObject={user}/>
                </NavItem>
            </ul>
        </nav>
    )
}