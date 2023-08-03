import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState("jdfitz@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("wait_user", JSON.stringify({
                        id: user.id
                    }))

                    navigate("/")
                } else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <header className="masthead">
            <main className="container--login">
                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h1>Worth the Wait</h1>
                        <div>
                            <hr className="divider"></hr>
                            <p className="login-text">Should you queue up?</p>
                        </div>
                        <div className="form--signIn">
                            <h2>Sign In</h2>
                            <fieldset>
                                <label htmlFor="inputEmail"> Email address </label>
                                <input type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="form-control"
                                    placeholder="Email address"
                                    required autoFocus/>
                            </fieldset>
                            <fieldset>
                                <button type="submit">
                                    Sign in
                                </button>
                            </fieldset>
                        </div>
                    </form>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main>
        </header>
    )
}