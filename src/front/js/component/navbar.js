import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';




export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [searchVisible, setSearchVisible] = useState(false);
    const [petType, setPetType] = useState(""); // Nuevo estado para el tipo de mascota
    // const [activeTab, setActiveTab] = useState(0);
    const [burger_class, setBurgerClass] = useState('burger-bar unclicked');
    const [menu_class, setMenuClass] = useState('menu hidden');
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [burgerOpen, setBurgerOpen] = useState(false);

 

    const [activeTab, setActiveTab] = useState(0);
    // Función para cambiar la pestaña activa
    const handleTabClick = (index) => {
        setActiveTab(index);
    };

 

    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass('burger-bar clicked')
            setMenuClass('menu visible')
        }
        else {
            setBurgerClass('burger-bar unclicked')
            setMenuClass('menu hidden')
        }
        setIsMenuClicked(!isMenuClicked)
    }

    const handleBurgerClick = () => {
        setBurgerOpen(!burgerOpen);
    };

    return (
        <>

            <nav className="navbar navbar-expand-lg navbarcolor">
                <div className="container">
                {/* <button className="navbar-toggler" type="button" onClick={handleBurgerClick}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div >
                <nav>
                    <div className="burger-menu" onClick={handleBurgerClick}>
                        <div className={burger_class} ></div>
                        <div className={burger_class} ></div>
                        <div className={burger_class} ></div>
                    </div>
                </nav>
                <div className={menu_class}></div>
                <div className="container d-flex justify-content-between align-items-center">
                        
                <ul className="mobile-menu">
                    <li><Link to="/"></Link></li>
                    <li><Link to="/adoptme"></Link></li>
                    <li><Link to="/animals"></Link></li>
                    <li><Link to="/animalshelter"> </Link></li>
                    <li><Link to="/tips"></Link></li>
                    <li><Link to="/lostanimals"></Link></li>
                    <li><Link to="/voluntaryform"></Link></li>
                    <li><Link to="/experiences"></Link></li>
                </ul>
               
                </div>
            </div> */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav nav-tabs ms-auto mx-auto mr-auto ml-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 0 ? "active" : ""}`} to="/" onClick={() => handleTabClick(0)}><b>Home</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 1 ? "active" : ""}`} to="/adoptme" onClick={() => handleTabClick(1)}><b>Adoptme</b></Link>
                            </li>
                            {store.user_id && (
                                <li className="nav-item">
                                    <Link className={`nav-link ${activeTab === 2 ? "active" : ""}`} to="/animals" onClick={() => handleTabClick(2)}><b>My Animals</b></Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 3 ? "active" : ""}`} to="/animalshelter" onClick={() => handleTabClick(3)}><b>Animal Shelter</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 4 ? "active" : ""}`} to="/tips" onClick={() => handleTabClick(4)}><b>Tips</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${activeTab === 5 ? "active" : ""}`} to="/lostanimals" onClick={() => handleTabClick(5)}><b>Lost animals</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/voluntaryform"><b>Voluntary form</b></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/experiences"><b>Experiences</b></Link>
                            </li>
                            {store.user_id && store.animalshelterId == null && store.peopleId == null && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users"><b>Manage Users</b></Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="ml-auto">
                        {!store.token ?
                            (<div className="d-flex me-3">
                                <Link to="/login">
                                    <button className="btn btn-dark me-3">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-dark">Register</button>
                                </Link>
                            </div>
                            ) : (
                                <div className="d-flex me-3">
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-transparent dropdown-toggle"
                                            type="button"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-user me-2"></i>
                                            <b>{store.user_email}</b>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="userDropdown">
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
                    </div>
                </div>

            </nav>

        </>
    );
};
