import { useEffect, useState } from "react";
import { ProfilePic } from "../profile/ProfilePic";
import { ReactComponent as EmptyUser } from "../nav/icons/emptyUser.svg"
import { ConversationPopup } from "./ConversationPopup";
import { ChatItem } from "./ChatItem";
import { ChatDisplay } from "./ChatDisplay";

export const ConversationItem = ({ conversationObject, localUserObject, goToMenu, setActiveMenu }) => {
    const [otherUser, setOtherUser] = useState({});
    const [conversation, setConversation] = useState(conversationObject);
    const [newestMessage, setNewestMessage] = useState({});
    const [messages, setMessages] = useState([]);

    useEffect(
        () => {

            fetch(`http://localhost:8088/messages?conversationId=${conversation.id}&_expand=conversation`)
                .then(res => res.json())
                .then(data => {
                    setMessages(data)
            })

            fetch(`http://localhost:8088/users`)
                .then(res => res.json())
                .then(data => {
                    if (conversation.userId1 === localUserObject.id) {
                        const foundUser = data.find((user) => {
                            return user.id === conversation.userId2
                        })
                        setOtherUser(foundUser)
                    } else if (conversation.userId2 === localUserObject.id) {
                        const foundUser = data.find((user) => {
                            return user.id === conversation.userId1
                        })
                        setOtherUser(foundUser)
                    }
            })
                
        },
        []
    )

    useEffect(
        () => {
            const lastIndex = messages.length - 1
            setNewestMessage(messages[lastIndex])
        },
        [messages]
    )

    const ProfilePicOrNot = () => {
        if (otherUser.imageId) {
            return <span className="icon-profilePic">
                <ProfilePic 
                userProfilePicId={otherUser.imageId}
                width='50px'
                height='50px'/>
            </span>
        } else {
            return <span className="icon-emptyUser">
                <EmptyUser className='emptyUser'/>
            </span>
        }
    }


    return (
        <div className="conversation">
                <div>
                    <div>
                        <a href="#" className="conversation-item"onClick={() => goToMenu && setActiveMenu(goToMenu)}>
                                {ProfilePicOrNot()}
                            <span>
                                <span className="conversation-userName">{otherUser.userName}</span>
                                <div style={{height: 8 + 'px'}}></div>
                                <span className="conversation-recentMessage">{newestMessage?.message}</span>
                            </span>
                        </a>
                    </div>
                </div>
        </div>
    )

    /* return (
        <div className="conversation">
            <div>
                <ChatItem
                icon={ProfilePicOrNot()}
                otherUserName={otherUser.userName}
                newestMessage={newestMessage?.message}
                >

                </ChatItem>
            </div>
        </div>
    ) */
}