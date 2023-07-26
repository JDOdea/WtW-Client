import { useEffect, useState } from "react"

export const OpinionEdit = ({ trigger, setTrigger, opinionId, attractionId, waitTime, getAllOpinions }) => {
    const [opinion, updateOpinion] = useState({
        worthIt: false,
        reasoning: "",
        waitTime: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/opinions/${opinionId}`)
                .then(res => res.json())
                .then((data) => {
                    updateOpinion(data)
            })
        },
        []
    )

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8088/opinions/${opinionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(opinion)
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
                            checked={opinion.worthIt}
                            value={opinion.worthIt}
                            onChange={
                                (e) => {
                                    const copy = {...opinion}
                                    copy.worthIt = e.target.checked
                                    updateOpinion(copy)
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
                                    updateOpinion(copy)
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