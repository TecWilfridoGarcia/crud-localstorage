import React from 'react'

export const Login = ({ history }) => {

    const handleLogin = () => {
        history.push("/")
    }
    return (
        <div>
            Login
            <button  onClick={handleLogin}>Login</button>
        </div>
    )
}
