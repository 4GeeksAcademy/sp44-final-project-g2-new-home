import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    console.log("This is your token", store.token);
    const navigate = useNavigate()

   
    const handleClick = async  (e) => {
        e.preventDefault();
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-2">
                    <div className="card mt-5 p-0 m-0 w-100 fondo">
                        <h1 className="esmeralda text-center my-3">Login</h1>
                        <div className="card-body">
                            <form>
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-6">
                                        <label className="form-label"><b>Email address</b></label>
                                        <input className="form-control" type="text" placeholder="write your email..." onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center">
                                    <div className="col-md-6">
                                        <label className=" mt-3 mb-3"><b>Password</b></label>
                                        <input className="form-control" type="password" placeholder="write your password..." onChange={(e) => setPassword(e.target.value)} />
                                    </div>    
                                </div>
                                <div className="row my-3 d-flex justify-content-center">
                                    <div className="col-md-6 mt-3 d-flex justify-content-center">
                                        <button className="btn btn-success" onClick={handleClick}><b>Login</b></button>
                                    </div>
                                </div>   
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-start" >
                    <div className="row d-flex justify-content-start">
                        <div className="col-md-12 d-flex justify-content-start">
                            <img src="https://tse1.mm.bing.net/th?id=OIP.Yaf0PrYnrgyOw939nocKwAHaE7&pid=Api"  alt="Puppy" style={{ marginTop: "150px", marginLeft: "-280px" }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	)
};
