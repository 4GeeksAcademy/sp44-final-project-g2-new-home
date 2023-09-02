import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import portada from "../../img/portada.png";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <div className="position-relative">
                <div className="portada-container">
                    <img src={portada} alt="Portada" className="portada-image" />
                </div>
                <img src={logo} alt="Logo" className="logo-overlay" />
            </div>
        </div>
    );
};
