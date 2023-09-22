import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    console.log("This is your token", store.token);
    const navigate = useNavigate()

   
    const handleClick = async  () => {
        await  actions.login(email, password);
        if(store.token && store.token != "" && store.token != undefined)  {
            // localStorage.setItem("user_email", store.user_email);
            setWelcomeMessage(`Welcome ${store.user_email}`);
            navigate("/");
        }
    }

    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
            setWelcomeMessage(`Welcome ${email}`);
        }
    }, [store.token]);
    

	return (
		<div className="text-center mt-5 mb-5">
            <div className="mt-5">
                <h1>LOGIN</h1>
                <div className="container d-flex flex-column align-items-center mt-5">
                    <div className="card w-25 verde-claro">
                        <div className="card-body">
                            <div className="">
                                <label className="me-3 mb-3"><b>Email address</b></label>
                                <input type="text" placeholder="write your email..." onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="me-3 mt-3 mb-3"><b>Password</b></label>
                                <input type="password" placeholder="write your password..." onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-dark mt-4" onClick={handleClick}>Login</button>
                        </div>
                    </div>
                    <div>
                        <img src="https://tse1.mm.bing.net/th?id=OIP.Yaf0PrYnrgyOw939nocKwAHaE7&pid=Api" alt="Puppy" />
                    </div>
                </div>
            </div>
        </div>
	)
};
