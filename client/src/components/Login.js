import React, { useState } from "react";

import AuthService from '../services/auth'
import { useHistory } from "react-router-dom";

import "./Login.css";

export default function Login() {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function loginUser() {
        AuthService.login(email, password).then(() => {
            history.push("/");
            window.location.reload(false);
        })
            .catch((err) => console.log(err));
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <h4>Login</h4>
                <div>
                    <label>Email</label>
                    <input
                        autoFocus
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-lg" type="submit"
                    disabled={!validateForm()} onClick={loginUser}>
                    Login
                </button>
            </form>
        </div>
    );
}
