import { useEffect, useState } from "react";
import "./Messaging.css"
import { ChatDisplay } from "./ChatDisplay";
import { NavItem } from "../nav/NavItem";
import { ReactComponent as CaretIcon } from "../nav/icons/caret.svg"

export const ConversationPopup = ({ conversationObject, localUserObject, chatOpen }) => {
    const [otherUser, setOtherUser] = useState({});
    const [conversation, setConversation] = useState(conversationObject);
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = useState(chatOpen);

    useEffect(
        () => {
            fetch(`http://localhost:8088/messages?conversationId=1&_expand=conversation`)
                .then(res => res.json())
                .then(data => {
                    setMessages(data)
            })
        },
        []
    )

    const chatWindow = () => {
        return <section className="chatWindow">
        <div className="chatWindow-content">
            <div className="chatWindow-header">
                <span>
                    <a href="#" className="otherUser-pic">
                        PIC
                    </a>
                </span>
                <span className="chatWindow-close" onClick={() => {setOpen(!open)}}>
                        X
                </span>
            </div>
            <div>
                <ChatDisplay 
                conversationObject={conversationObject}/>
            </div>
        </div>
    </section>
    }



    return (
        <>
        {open && chatWindow()}
        </>
    )
}