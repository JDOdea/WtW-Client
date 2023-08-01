import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { OpinionsList } from "../opinions/OpinionsList"
import { DiscussionList } from "../discussions/DiscussionList"

export const AttractionDetails = () => {
    /* const [park, updatePark] = useState({}) */
    const [attraction, update] = useState({})
    const [details, updateDetails] = useState({})
    const [live, updateLive] = useState({})
    const [opinions, setOpinions] = useState([])
    /* const [filteredOpinions, setFiltered] = useState([]) */
    const [discussions, setDiscussion] = useState([])

    /* const {parkSlug} = useParams() */
    const {attractionSlug} = useParams()

    const getAllOpinions = () => {
        fetch(`http://localhost:8088/opinions`)
            .then(res => res.json())
            .then((opinionArray) => {
                const singleAttractionOpinions = opinionArray.filter(opinion => {
                    return opinion.attractionId === attraction.id
                })
                setOpinions(singleAttractionOpinions)
        })
    }

    const getAllDiscussions = () => {
        fetch(`http://localhost:8088/discussions?attractionId=${attraction.id}`)
            .then(res => res.json())
            .then((discussionArray) => {
                setDiscussion(discussionArray)
        })
    }

    // Function to check if ride is operating
    const attractionWaitTime = () => {
        if (details.status !== "CLOSED") {
            return "Current Wait Time: " + live?.STANDBY?.waitTime + " minutes"
        } else {
            return "Attraction Currently Closed"
        }
    }

    // Initial useEffect
    useEffect(
        () => {
            fetch(`https://api.themeparks.wiki/v1/entity/${attractionSlug}/live`)
                .then(res => res.json())
                .then((data) => {
                    update(data) // Update current attraction
                    updateDetails(data.liveData[0]) // Update current attraction details
                    updateLive(data.liveData[0].queue) // Update current attraction queue time
            })
        },
        []
    )

    // Grab opinions and discussions based on selected attraction
    useEffect(
        () => {
            getAllOpinions()
            getAllDiscussions()
        },
        [attraction]
    )


    return (
        <>
        <h1 className="attraction-header">{attraction.name}</h1>
        <article>
            <div>
                {
                    attractionWaitTime()
                }
            </div>
        </article>
        <OpinionsList 
        attractionId={attraction.id} 
        waitTime={live?.STANDBY?.waitTime} 
        opinions={opinions}
        opinionSetter={setOpinions}
        opinionGetter={getAllOpinions}
        />
        <DiscussionList 
        discussions={discussions}
        attractionName={attraction.name}
        />
        </>
    )
}
