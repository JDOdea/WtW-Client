import { useEffect, useState } from "react"
import "./Opinions.css"
import { Opinion } from "./Opinion"
import { OpinionForm } from "./OpinionForm"

export const OpinionsList = ({ attractionId, waitTime, opinionsArray, opinionSetter, opinionGetter}) => {
    const [userOpinions, setUserOpinions] = useState([]);
    const [filteredOpinions, setFiltered] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false)

    const localWaitUser = localStorage.getItem("wait_user")
    const waitUserObject = JSON.parse(localWaitUser)

    const handleSortTab = (tab) => {

        const sortAscending = () => {
            const sortedAscending = [...userOpinions]
            sortedAscending.sort(({waitTime: a}, {waitTime: b}) => a-b)
            setFiltered(sortedAscending)
        }

        const sortDescending = () => {
            const sortedDescending = [...userOpinions]
            sortedDescending.sort(({waitTime: a}, {waitTime: b}) => b-a)
            setFiltered(sortedDescending)
        }

        const sortWorth = () => {
            const sortedWorth = [...userOpinions].filter((opinion) => {
                return opinion.worthIt === true
            })
            setFiltered(sortedWorth)
        }
        
        const sortNotWorth = () => {
            const sortedNotWorth = [...userOpinions].filter((opinion) => {
                return opinion.worthIt === false
            })
            setFiltered(sortedNotWorth)
        }

        switch(tab) {
            case 'all':
                setFiltered(userOpinions)
                break;
            case 'asc':
                sortAscending();
                break;
            case 'desc':
                sortDescending();
                break;
            case 'worth':
                sortWorth();
                break;
            case 'notWorth':
                sortNotWorth();
                break;
        }
    }

    useEffect(
        () => {
            setUserOpinions(opinionsArray)
        },
        [opinionsArray]
    )

    useEffect(
        () => {
            setFiltered(userOpinions)
        },
        [userOpinions]
    )

    return (
        <>
            <div className="attractionOpinion-button">
                <button
                onClick={() => setButtonPopup(true)}>
                    Got an opinion?
                </button>
            </div>
            
            <button className="tablink" onClick={() => {handleSortTab('all')}} id="defaultOpen">All</button>
            <button className="tablink" onClick={() => {handleSortTab('asc')}} >Wait Time (Ascending)</button>
            <button className="tablink" onClick={() => {handleSortTab('desc')}} >Wait Time (Descending)</button>
            <button className="tablink" onClick={() => {handleSortTab('worth')}}>Worth It</button>
            <button className="tablink" onClick={() => {handleSortTab('notWorth')}}>Not Worth It</button>
            <article className="opinionsSection">
                <div className="opinions-header">
                    
                    
                </div>
                <div className="opinions">
                    {
                        filteredOpinions.map(
                            (opinion) => <Opinion 
                            opinionObject={opinion}
                            opinionId={opinion.id}
                            currentUser={waitUserObject}
                            getAllOpinions={opinionGetter}
                            key={`opinion--${opinion.id}`}
                            />
                        )
                    }
                </div>
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