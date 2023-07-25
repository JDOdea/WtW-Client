import "./NavBar.css"
import { useNavigate } from "react-router-dom"
import { NavItem } from "./NavItem"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { DropdownMenu } from "./DropdownMenu"



export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <NavItem icon={<CaretIcon />}>
                    <DropdownMenu />
                </NavItem>
            </ul>
        </nav>
    )
}