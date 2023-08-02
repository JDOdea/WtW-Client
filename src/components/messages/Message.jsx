import { useEffect, useState } from "react"

export const Message = ({ messageObject }) => {
    const [message, setMessage] = useState(messageObject);


    useEffect(
        () => {
            
        },
        []
    )


    return (
        <>
        <div className="message">
            {messageObject.message}
        </div>
        </>
    )
}