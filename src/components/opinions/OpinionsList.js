import { useState } from "react"
import "./Opinions.css"
import { Opinion } from "./Opinion"
import { OpinionForm } from "./OpinionForm"

export const OpinionsList = ({ attractionId, waitTime, opinions, opinionSetter, opinionGetter}) => {
    const [buttonPopup, setButtonPopup] = useState(false)

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    return (
        <>
            <button onClick={() => setButtonPopup(true)}>Got an opinion?</button>
            <h2>Opinions:</h2>
            <article className="opinions">
                {
                    opinions.map(
                        (opinion) => <Opinion 
                        opinionObject={opinion}
                        opinionId={opinion.id}
                        currentUser={waitUserObject}
                        getAllOpinions={opinionGetter}
                        key={`opinion--${opinion.id}`}
                        />
                    )
                }
            </article>
            <OpinionForm 
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
            attractionId={attractionId}
            waitTime={waitTime}
            getAllOpinions={opinionGetter}
            >
            </OpinionForm>
        </>
    )
}