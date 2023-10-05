import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import portada from "../../img/portada.png";
import "../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";




export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        actions.get_all_animals();
      }, []);

    const handleAdoptme = () =>{
        navigate("/adoptme")
    }
    const handleAnimalshelter = () => {
       navigate("/animalshelter")
    }

    return (
        <div className="text-center mb-0 fondo">
            <div className="position-relative">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 p-0">
                            <img src={portada} alt="Portada" className="img-fluid"  style={{
                                maxHeight: "560px", 
                                objectFit: "cover", 
                                width: "100%",
                                objectPosition: "top" 
                            }}/>
                        </div>
                    </div>
                </div>    
                <img src={logo} className="custom-logo" alt="Logo" />  
            </div>
            <div className="row mt-3" style={{height: "200%"}}>
                <div className="col-md-12 mb-5" style={{height: "200%"}}>
                    <button onClick={handleAdoptme} className="btn btn-lg btn-light border border-dark portada-btn border-3 me-3"  style={{maxWidth: "125px", height: "140px"}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/181/181867.png" style={{width: "90px"}}/>
                        <figcaption className="mt-1">Pets</figcaption>
                    </button>
                    <button onClick={handleAnimalshelter} className="btn btn-lg btn-light border portada-btn border-dark border-3" style={{maxWidth: "125px", height: "140px"}}>
                        <img src="http://cdn.onlinewebfonts.com/svg/img_74050.png" style={{width: "90px"}}/>
                        <figcaption className="mt-1">Protectors</figcaption>
                    </button>
                </div>
            </div>
            <div className="row">
                <h1 className="coloresmeralda mt-5 my-3">These are some of our pets...</h1>
            </div>
            <div className="row mt-3  d-flex justify-content-center custom-card-container">
                    {store.animals.slice(0, 4).map((animal, index) => (
                <div key={index} className="col-md-2 col-sm-3 custom-card-item">
                 <Link to="animal" state={animal} className="card-link">
                    <div className="card custom-card">
                    <img
                        src={animal.photo}
                        className="card-img-top"
                        alt={`Animal ${index}`}
                        style={{ height: "150px", objectFit: "cover", objectPosition: "center" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title"><b>{animal.name}</b></h5>
                    </div>
                    </div>
                </Link>
                </div>
                ))} 
            </div>
    </div>
  );
};





