import { useState } from "react"
import "./OpinionForm.css"

export const OpinionForm = ({ trigger, setTrigger, attractionId, waitTime, getAllOpinions}) => {
    const [opinion, update] = useState({
        worthIt: false,
        reasoning: ""
    })

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const opinionToSendToAPI = {
            userId: waitUserObject.id,
            attractionId: attractionId,
            waitTime: waitTime,
            worthIt: opinion.worthIt,
            reasoning: opinion.reasoning
        }

        fetch(`http://localhost:8088/opinions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(opinionToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                setTrigger(false)
                getAllOpinions()
                
        })
    }

    return (trigger) ? 
    (
        <div className="popupForm">
            <div className="popup-inner">
                <button className="close-button"
                    onClick={() => setTrigger(false)}
                >Close</button>
                <form className="opinionForm">
                <h2 className="opinionForm-title">Give an opinion</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="worthIt">Worth it?</label>
                        <input 
                            type="checkbox"
                            className="form-control"
                            value={opinion.worthIt}
                            onChange={
                                (e) => {
                                    const copy = {...opinion}
                                    copy.worthIt = e.target.checked
                                    update(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="reasoning">What's your reason?</label>
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Brief description of your thoughts..."
                            value={opinion.reasoning}
                            onChange={
                                (e) => {
                                    const copy = {...opinion}
                                    copy.reasoning = e.target.value
                                    update(copy)
                                }
                            }
                        />
                    </div>
                </fieldset>
                <button
                    onClick={(e) => handleSaveButtonClick(e)}
                className="btn btn-primary">
                    Submit Opinion
                </button>
                </form>
            </div>
        </div>
    )
    :
    ""
}