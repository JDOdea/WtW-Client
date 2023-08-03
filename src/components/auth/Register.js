import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        userName: "",
        password: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("wait_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    // Duplicate email
                    window.alert("Account with that email address already exists")
                } else {
                    // New email
                    registerNewUser()
                }
            })
    }

    const updateUser = (e) => {
        const copy = {...user}
        copy[e.target.id] = e.target.value
        setUser(copy)
    }

    return (
        <main 
        className="signUpContainer"
        style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register Below</h1>
                <fieldset>
                    <label htmlFor="fullName"> User Name </label>
                    <input onChange={updateUser}
                        type="text" id="userName" className="form-control"
                        placeholder="Enter your user name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input onChange={updateUser} 
                        type="password" id="password" className="form-control"
                        placeholder="" required />
                </fieldset>
                <fieldset>
                    <label>
                        <input type="checkbox" defaultChecked name="remember" /> Remember me
                    </label>
                    
                    <p>By creating an account you agree to our <a href="https://www.youtube.com/watch?v=7PfZLPCqxvY">Terms & Privacy</a></p>
                    <button className="register-button" type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}