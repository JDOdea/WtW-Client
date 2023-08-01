import { useEffect, useRef, useState } from "react"
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg"
import { ReactComponent as BellIcon } from "./icons/bell.svg"
import { ReactComponent as BoltIcon } from "./icons/bolt.svg"
import { ReactComponent as CaretIcon } from "./icons/caret.svg"
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg"
import { ReactComponent as CogIcon } from "./icons/cog.svg"
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg"
import { ReactComponent as PlusIcon } from "./icons/plus.svg"

import { CSSTransition } from "react-transition-group"
import { Link, useNavigate } from "react-router-dom"
import { Conversation } from "../messages/Conversation"
import { ProfilePic } from "../profile/ProfilePic"

export const DropdownMenu = (props) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(props.currentUserObject);
    const [conversations, setConversations] = useState([]);
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState()
    const dropdownRef = useRef(null)
    const navigate = useNavigate()


    useEffect(
        () => {
            setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)

            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then(data => {
                    setUsers(data)
            })

            // FIX
            fetch(`http://localhost:8088/conversations?userId1=${props.currentUserObject.id}`)
                .then(res => res.json())
                .then(data => {
                    setConversations(data)
            })
        },
        []
    )


    const calcHeight = (el) => {
        const height = el.offsetHeight
        setMenuHeight(height)
    }

    const DropdownItem = (props) => {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        )
    }

    const ProfileItem = (props) => {

        return (
            <Link className="menu-item" to={`/profile`}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </Link>
        )
    }

    const LogoutItem = (props) => {
        return (
            <Link className="menu-item" to=""
                onClick={() => {
                    localStorage.removeItem("wait_user")
                    navigate("/", {replace: true})
                }}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </Link>
        )
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef} >

            <CSSTransition 
            in={activeMenu === 'main'} 
            timeout={500}
            classNames="menu-primary"
            unmountOnExit 
            onEnter={calcHeight}>
                <div className="menu">

                    <ProfileItem leftIcon={<ChevronIcon />}>
                        My Profile
                    </ProfileItem>
                    <DropdownItem leftIcon={<BellIcon />}>
                        Opinions
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon />}>
                        Itineraries
                    </DropdownItem>
                    <DropdownItem 
                    leftIcon={<MessengerIcon />}
                    goToMenu="messages">
                        Messages
                    </DropdownItem>
                    <DropdownItem
                    leftIcon={<CogIcon />}
                    rightIcon={<ChevronIcon />}
                    goToMenu="settings">
                        Settings
                    </DropdownItem>
                    <LogoutItem leftIcon={<ArrowIcon />}>
                        Logout
                    </LogoutItem>
                </div>
            </CSSTransition>

            <CSSTransition 
            in={activeMenu === 'settings'} 
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit 
            onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem 
                    leftIcon={<ArrowIcon />} 
                    goToMenu="main">
                        <h4>Menu</h4>
                    </DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    <DropdownItem>Settings</DropdownItem>
                    
                </div>
            </CSSTransition>

            <CSSTransition
            in={activeMenu === 'messages'}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" >
                        <h4>Menu</h4>
                    </DropdownItem>
                    <div className="menu">
                        {
                            conversations.map(
                                (conversation) => 
                                <Conversation 
                                conversationObject={conversation}
                                localUserObject={currentUser}
                                key={`${conversation.id}`}
                                />
                            )
                        }
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}