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
  

  const handleRegister = async () => {
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
    
    await actions.register(email, password, isActive, userType, name, lastname, cif, address, city, zipCode, web);
    console.log("Valor de 'website' después de:", web); 
    navigate("/login");
  };     
  
  
  return (
    <div className="text-center mt-5">
      <h1>Register</h1>
      <div>
        <label className="me-3">Email:</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="me-3 mt-3">Contraseña:</label>
        <input className="me-5" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label className="mt-3 me-3">Active: </label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </div>
      <div>
        <label className="me-3 mt-3">Tipo de usuario:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="Person">Person</option>
          <option value="AnimalShelter">AnimalShelter</option>
        </select>
      </div>
      {userType === "AnimalShelter" && (
        <>
          <div>
            <label className="me-3 mt-3">CIF:</label>
            <input maxLength={20} type="text" name="cif" onChange={(e) => setCif(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3">Name:</label>
            <input maxLength={20} type="text" name="name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3">Address:</label>
            <input maxLength={80} type="text" name="address" onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3">City:</label>
            <input maxLength={30} type="text" name="city" onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3">Zipcode:</label>
            <input maxLength={10} type="text" name="zipCode" onChange={(e) => setZipCode(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3">Web:</label>
            <input maxLength={100} type="text" name="web" onChange={(e) => setWeb(e.target.value)} required />
          </div>
        </>
      )}
      {userType === "Person" && (
        <>
          <div>
            <label className="me-3 mt-3">Name:</label>
            <input maxLength={20} type="text" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="me-3 mt-3">Last Name:</label>
            <input maxLength={20} type="text" onChange={(e) => setLastname(e.target.value)} required />
          </div>
        </>
      )}
      <button className="btn btn-dark ms-5 mt-3" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );

};

export default Register;