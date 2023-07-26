import { Outlet, Route, Routes } from "react-router-dom"
import { ParksContainer } from "../parks/ParksContainer"
import { ResortsContainer } from "../resorts/ResortsContainer"
import { AttractionsContainer } from "../attractions/AttractionsContainer"
import { AttractionDetails } from "../attractions/AttractionDetails"
import { OpinionForm } from "../opinions/OpinionForm"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

                <Route path="" element={ <ResortsContainer /> } />
                <Route path=":resortSlug/parks" element={ <ParksContainer /> } />
                <Route path=":resortSlug/:parkSlug/rides" element={ <AttractionsContainer /> } />
                <Route path=":parkSlug/:attractionSlug/details" element={ <AttractionDetails /> }/>
                <Route path=":parkSlug/:attractionSlug/createOpinion" element={ <OpinionForm /> }/>
            </Route>
        </Routes>
    )
}