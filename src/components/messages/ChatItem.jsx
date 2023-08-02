import { useState } from "react";

export const ChatItem = (props) => {
    const [currentUser, setcurrentUser] = useState(props.localUserObject);
    

    /* return (
        <li className="chat-item">
            <a href="#" className="conversation-item" onClick={() => setOpen(!open)}>
                {props.icon}
                <span>
                    <span className="conversation-userName">{props.otherUserName}</span>
                    <div style={{height: 8 + 'px'}}></div>
                    <span className="conversation-recentMessage">{props.newestMessage}</span>
                </span>
            </a>

            {open && props.children}
        </li>
    ) */

    // Function to determine which side of chat window message is on
    const leftOrRight = (messageObject) => {
        if(messageObject.senderId === currentUser.id) {
            return (
                <span className="chat-rightMessage">{messageObject.message}</span>
            )
        } else {
            return (
                <span className="chat-leftMessage">{messageObject.message}</span>
            )
        }
    }

    return (
        <div className="chat-item">
            {leftOrRight(props.messageObject)}
        </div>
    )
}