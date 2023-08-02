import { useEffect, useState } from "react";
import { Message } from "./Message";
import { ChatItem } from "./ChatItem";


export const ChatDisplay = ({ conversationObject, localUserObject, setMenuHeight, dropdownRef }) => {
    const [messages, setMessages] = useState([]);

    useEffect(
        () => {
            setMenuHeight((dropdownRef.current?.firstChild.offsetHeight) * 2)

            fetch(`http://localhost:8088/messages?conversationId=1&_expand=conversation`)
                .then(res => res.json())
                .then(data => {
                    setMessages(data)
            })
        },
        []
    )

    return (
        <>
        <div className="messages">
            {
                messages.map(
                    (message) => {
                        return <ChatItem
                        messageObject={message}
                        localUserObject={localUserObject}
                        key={`chatItem--${message.id}`}
                        >

                        </ChatItem>
                    }
                )
            }
        </div>
        <div className="chatWindow-input">
            <input 
                className="chatWindow-input"
                placeholder="Type Message..."
                type="text"
                />
        </div>
        </>
    )

    return (
        <> </>
    )
}