import { Route, Routes } from "react-router-dom"
import { Login } from "./auth/Login"

export const Wait = () => {
    return <Routes>
        <Route path="/login" element={<Login />} />
    </Routes>
}