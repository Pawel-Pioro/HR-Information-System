import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIContext, AuthContext } from "../../context/contexts.js";


export default function Login() {
    const { client } = useContext(APIContext)
    const { loginHandler } = useContext(AuthContext)
    const navigate = useNavigate()

    const [error, setError] = useState(null)

    const [userInputs, setUserInputs] = useState({
        "username": "",
        "password": ""
    })

    function onSubmit(e) {
        e.preventDefault()

        if (userInputs.username && userInputs.password) {
            client.post('auth/login/', userInputs).then((response) => {
                loginHandler(response.data.tokens)
                navigate('/')
            })
                .catch((error) => {
                    console.log(error.response.data)
                    if (Object.keys(error.response.data).length > 0) {
                        setError(Object.values(error.response.data)[0])
                    }
                })

        }
    }

    return (
        <div className="flex justify-center ">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-10">
                <div className="card-body">
                    {error &&
                        <div role="alert" className="alert alert-warning mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    }
                    <h1 className="font-bold text-4xl text-center my-3">Login</h1>
                    <form onSubmit={onSubmit}>
                        <fieldset className="fieldset">
                            <label className="label">Username</label>
                            <input type="text" onChange={(e) => setUserInputs({ ...userInputs, "username": e.target.value })} value={userInputs.username} className="input" placeholder="Username" />
                            <label className="label">Password</label>
                            <input type="password" onChange={(e) => setUserInputs({ ...userInputs, "password": e.target.value })} value={userInputs.password} className="input" placeholder="Password" />
                            <button className="btn btn-neutral mt-4">Login</button>
                            <div className="text-center mt-3"><span>Dont have an account? </span><Link to="/register" className="link link-hover font-bold">Register</Link></div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}
