import { useState } from "react"
import { OpinionEdit } from "./OpinionEdit"

export const Opinion = ({ opinionObject, opinionId, currentUser, getAllOpinions }) => {
    const [buttonPopup, setButtonPopup] = useState(false)

    const editButton = () => {
        return <>
            <button onClick={() => {
            setButtonPopup(true)
        }} className="opinion-edit">Edit</button>
        <OpinionEdit 
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        opinionId={opinionId}
        attractionId={opinionObject.attractionId}
        waitTime={opinionObject.waitTime}
        getAllOpinions={getAllOpinions}
        />
        </>
    }

    const deleteButton = () => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/opinions/${opinionId}`, { method: "DELETE" })
                .then(getAllOpinions())
                
        }} className="opinion-delete">Delete</button>
    }

    return <section className="opinion">
        <header className="opinion-header">{opinionObject.waitTime} minute wait.</header>
        <h4>
            {
                opinionObject.worthIt
                ?
                    "Worth it: YES"
                :
                    "Worth it: NO"
            }
        </h4>
        <section>{opinionObject.reasoning}</section>
        <footer>
            {
                opinionObject.userId === currentUser.id
                ?
                    <>
                        {
                            editButton()
                        }
                        {
                            deleteButton()
                        }
                    </>
                :
                    ""
            }
        </footer>
    </section>
}