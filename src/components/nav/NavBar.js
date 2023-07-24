import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <h1 className="navbar__logo">WtW</h1>
            {
                localStorage.getItem("wait_user")
                ? <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("wait_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
                : ""
            }
        </ul>
    )
}