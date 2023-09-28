import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const Register = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [userType, setUserType] = useState("Person"); // Valor predeterminado: Persona
  const [lastname, setLastname] = useState("");
  const [name, setName] = useState(""); 
  const [cif, setCif] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [web, setWeb] = useState("");
  
  
    
    

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!isActive) {
      alert("You must accept the terms and conditions to be able to register on our page.");
      return;
    }

    console.log("Datos que se enviarán:", {
      email,
      password,
      isActive,
      userType,
      name,
      lastname,
      cif,
      address,
      city,
      zipCode,
      web
    });
    
    const success = await actions.register(email, password, isActive, userType, name, lastname, cif, address, city, zipCode, web); 
    if(success){
      navigate("/login");
    } else{
      alert("This email is already registered.")
    }
  };     
  
  
  return (
    <div className="text-center">
      <h1 className="pt-5">Register</h1>
      <div className="container d-flex justify-content-center">
      <div className="card w-50 verde-claro">
      <div className="card-body">
      <form onSubmit={handleRegister}>
      <div>
        <label className="me-3 form-label"><b>Email:</b></label>
        <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="me-3 mt-3 form-label"><b>Contraseña:</b></label>
        <input className="me-5 form-control" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label className="me-3 mt-3 form-label"><b>Tipo de usuario:</b></label>
        <select className="form-control" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="Person">Person</option>
          <option value="AnimalShelter">AnimalShelter</option>
        </select>
      </div>
      {userType === "AnimalShelter" && (
        <>
          <div>
            <label className="me-3 mt-3 form-label"><b>CIF:</b></label>
            <input className="form-control" maxLength={20} type="text" name="cif" onChange={(e) => setCif(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3 form-label"><b>Name:</b></label>
            <input className="form-control" maxLength={20} type="text" name="name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3 form-label"><b>Address:</b></label>
            <input className="form-control" maxLength={80} type="text" name="address" onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3 form-label"><b>City:</b></label>
            <input className="form-control" maxLength={30} type="text" name="city" onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3 form-label"><b>Zipcode:</b></label>
            <input className="form-control" maxLength={10} type="text" name="zipCode" onChange={(e) => setZipCode(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3 form-label"><b>Web:</b></label>
            <input className="form-control" maxLength={100} type="text" name="web" onChange={(e) => setWeb(e.target.value)} required />
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="mt-3"
                checked={isActive}
                onChange={() => setIsActive(!isActive)} // Cambia el estado de isActive cuando se hace clic en el checkbox
              />
            </div>
              <div className="d-flex align-items-center">
                <label className="mt-5 me-3 form-label">
                  I have read and accept the <a href="/policy">terms and conditions</a> and declare that I am
                  of legal age.
                </label>
            </div>
          </div>
        </>
      )}
      {userType === "Person" && (
        <>
          <div>
            <label className="me-3 mt-3 form-label"><b>Name:</b></label>
            <input className="form-control" maxLength={20} type="text" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3 form-label"><b>Last Name:</b></label>
            <input className="form-control" maxLength={20} type="text" onChange={(e) => setLastname(e.target.value)} required />
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                className="mt-3"
                checked={isActive}
                onChange={() => setIsActive(!isActive)} // Cambia el estado de isActive cuando se hace clic en el checkbox
              />
            </div>
              <div className="d-flex align-items-center">
                <label className="mt-5 me-3 form-label">
                  I have read and accept the <a href="/policy">terms and conditions</a> and declare that I am
                  of legal age.
                </label>
            </div>
          </div>
        </>
      )}
      <button className="btn btn-dark ms-5 mt-3">
        Registrarse
      </button>
      </form>
      </div>
      </div>
      </div>
    </div>
  );

};

export default Register;