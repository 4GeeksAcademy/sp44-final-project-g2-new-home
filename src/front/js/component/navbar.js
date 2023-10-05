import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import "../../styles/index.css";


export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const animalshelterId = localStorage.getItem("animalshelterId");
    const peopleId = localStorage.getItem("peopleId");

    // Estado local para el enlace activo
    const [activeLink, setActiveLink] = useState("");
    
    // Función para establecer el enlace activo
    const handleSetActiveLink = (link) => {
        setActiveLink(link);
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar p-3">
            <div className="container-fluid">
                <Link to="/" onClick={() => handleSetActiveLink("home")} className={`text-light navbar-brand custom-link ps-2 ${activeLink === "home" ? "custom-active" : ""}`}><b>Home</b></Link>
                <button className="navbar-toggler border-light text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span><i className="fas fa-bars text-light"></i></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav  mx-auto mb-2 mb-lg-0">
                        <li className="nav-item ps-2">
                            <Link to="/adoptme" onClick={() => handleSetActiveLink("adoptme")} className={`text-light navbar-brand custom-link ${activeLink === "adoptme" ? "custom-active" : ""}`}><b>Adopt me</b></Link>
                        </li>
                        <li className="nav-item ps-2">
                        {store.user_id && (
                        <Link to="/animals" onClick={() => handleSetActiveLink("animals")} className={`text-light navbar-brand custom-link ${activeLink === "animals" ? "custom-active" : ""}`}><b>My Animals</b></Link>
                        )}
                        </li>
                        <li className="nav-item ps-2">               
                        <Link to="/animalshelter" onClick={() => handleSetActiveLink("animalshelter")} className={`text-light navbar-brand custom-link ${activeLink === "animalshelter" ? "custom-active" : ""}`}><b>Animal Shelter</b></Link>
                        </li>
                        <li className="nav-item ps-2">
                        <Link to="/lostanimals" onClick={() => handleSetActiveLink("lostanimals")} className={`text-light navbar-brand custom-link ${activeLink === "lostanimals" ? "custom-active" : ""}`}><b>Lost animals</b></Link>
                        </li>
                        <li className="nav-item ps-2"> 
                        <Link to="/voluntaryform" onClick={() => handleSetActiveLink("voluntaryform")} className={`text-light navbar-brand custom-link ${activeLink === "voluntaryform" ? "custom-active" : ""}`}>
                        <b>{(!store.user_id) ? "Become a volunteer" : (animalshelterId !== 'false' || (store.user_id && peopleId === 'false' && animalshelterId === 'false')) ? 
                        "Find your volunteer" : "Voluntary Form" }</b>
                        </Link>
                        </li>
                        <li className="nav-item ps-2">
                        <Link to="/experiences" onClick={() => handleSetActiveLink("experiences")} className={`text-light navbar-brand custom-link ${activeLink === "experiences" ? "custom-active" : ""}`}><b>Experiences</b></Link>
                        </li>
                        <li className="nav-item ps-2">
                        <Link to="/tips" onClick={() => handleSetActiveLink("tips")} className={`text-light navbar-brand custom-link ${activeLink === "tips" ? "custom-active" : ""}`}><b>Tips</b></Link>
                        </li>
                        <li className="nav-item ps-2">
                        {store.user_id && animalshelterId === 'false' && peopleId === 'false' && (
                        <Link to="/users" onClick={() => handleSetActiveLink("users")} className={`text-light navbar-brand custom-link ${activeLink === "users" ? "custom-active" : ""}`}><b>Manage Users</b></Link>
                        )}
                        </li>
                    </div>                      
                    <form className="d-flex" role="search">
                        {!store.token ?
                            (<div className="d-flex me-3">
                                <Link to="/login">
                                    <button className="btn btn-transparent fs-5 text-light login-btn me-3"><b>Login</b></button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-transparent fs-5 text-light login-btn"><b>Register</b></button>
                                </Link>
                            </div>
                            ) : (
                            <div className="d-flex me-3 ps-2">
                                <div className="dropdown">
                                <button
                                    className="btn btn-transparent dropdown-toggle custom-drop-btn"
                                    type="button"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user me-3 text-light"></i>
                                    <b style={{ color: 'white' }}>{store.user_email}</b>
                                </button>
                                    <ul className="dropdown-menu dropdown-menu-lg-end custom-dropdown-menu" aria-labelledby="userDropdown">
                                        <li>
                                            <Link to="/" onClick={() => actions.logout()} className="dropdown-item">
                                                Logout
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile" className="dropdown-item">
                                                My profile
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </nav>
    );
};
