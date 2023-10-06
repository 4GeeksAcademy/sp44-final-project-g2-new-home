import React, { useState, useEffect, useContext } from "react";
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import ExpandableCell from "./expansion";
import voluntariofoto from "../../img/voluntariofoto.jpg";

export const VoluntaryForm = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    time: "",
    description: "",
    availability: "Morning", 
  };

  const [formData, setFormData] = useState(initialFormData);
  const [cityFilter, setCityFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  useEffect(() => {
    actions.getVolunteers();
    if (store.user_id && store.user_email) {
      // Actualiza el campo de email con store.user_email
      setFormData({ ...formData, email: store.user_email })}
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cityFilter") {
      setCityFilter(value);
    } else if (name === "availabilityFilter") {
      setAvailabilityFilter(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGoHome = () => {
    navigate("/");
  }

  const handleGoRegister = () => {
    navigate("/register");
 }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
   const success = await actions.volunteer(
      formData.address,
      formData.city,
      formData.zipCode,
      formData.phone,
      formData.email,
      formData.description,
      formData.availability,
      store.peopleId
      // Asegúrate de que peopleId esté definido y disponible
    );
    if(success){
      alert("Form submitted successfully")
      setFormData(initialFormData);
      navigate("/"); 
    }
    
  }; 
  
  const animalshelterId = localStorage.getItem("animalshelterId")
  const peopleId = localStorage.getItem("peopleId");
  return (
<div className={`container${(animalshelterId !== 'false' || (store.user_id && peopleId === 'false' && animalshelterId === 'false')) ? '-fluid px-5' : ''} my-5`}>
      {!store.user_id ? (
        <div className="container">
          <h1 className="card-title text-center coloresmeralda esmeralda my-5">Join and help us</h1>
          <div className="card text-center fondo p-0 mx-auto"style={{maxWidth: "50%"}}>
          <img src={voluntariofoto} className="rounded-0 p-3"/>
          <div className="card-body">
            <p className="card-text text-start pt-3 px-3 fs-5">Are you passionate about animals? Do you want to make a difference in their lives? Join our team of volunteers and be part of the change you want to see in the world!</p>
            <p className="card-text text-start px-3 fs-4"><b>You choose how you want to help.</b></p>
            <p className="card-text text-start  px-3 pb-3 fs-5">Every small gesture counts, and together we can create a better world for our furry friends. Sign up to volunteer today and be part of our family of animal lovers!</p>
          </div>
          <div className="card-footer">
            <p className="card-text text-start pb-0 p-3 fs-5" >Together we make a difference. Join our team and change lives, one paw at a time. Register and complete the form. They will call you soon..</p>
            <button className="btn-success btn-lg mb-3" onClick={handleGoRegister}><b>Register</b></button>
          </div>
        </div>
      </div>
      ) :  ( animalshelterId !== 'false') || (store.user_id  && peopleId === 'false' && animalshelterId === 'false' ) ? ( 
        <div className="container-fluid pb-5 mb-3">
          <h1 className="titulos text-center mt-2 mb-5 esmeralda">
            Find your volunteer
          </h1>
          <div className="row d-flex justify-content-center" style={{maxWidth: "120%"}}>
            <div className="col-md-2 px-0 pt-0 pb-0 card border border-4 sombra rounded-2 mt-5" style={{ maxHeight: "360px", overflowY: "auto" }}>
              <div className="leyendadifuminado card-header p-3 text-center" style={{width:"100%"}}>
                <h5 className="text-light"><b>Find faster here{"\u00A0"}{"\u00A0"}{"\u00A0"}<i className="fas fa-paw text-light"></i></b></h5>
              </div>
              <div className="card-body p-3" style={{ flex: "0 0 auto" }}>
                <div className="row d-flex justify-content-center mt-3">
                  <div className="col-md-12 d-flex justify-content-center flex-column">
                  <label className="form-label"><b>Select a city</b></label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="cityFilter"
                    placeholder="Filter by City"
                    value={cityFilter}
                    onChange={handleInputChange}
                  />
                 </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="form-label"><b>Availability</b></label>
                  <select
                    className="form-select mt-3"
                    name="availabilityFilter"
                    value={availabilityFilter}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Filter by Availability</option>
                    <option value="">All</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                  </select>
                </div>
              </div>
              </div>
            </div>
            <div className="col-md-10 mt-5">
            <div className="table-responsive">
              <table className="table  table-striped table-hover border border-4" style={{ flex: "1" }}>
              <thead>
                <tr className="text-center">
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Post Code</th>
                  <th scope="col">Availability</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                {store.volunteers
                  .filter((item) => {
                    // Filtrar por ciudad
                    const cityMatch = item.city.toLowerCase().includes(cityFilter.toLowerCase());
                    // Filtrar por disponibilidad
                    const availabilityMatch = item.availability.toLowerCase().includes(availabilityFilter.toLowerCase());
                    // Si ambos filtros son verdaderos (o si no se han ingresado filtros), mostrar el usuario
                    return cityMatch && availabilityMatch;
                  })
                  .map((item) => (
                    <tr className="text-center custom-table-row" key={item.id}>
                      <td>{item.email}</td>
                      <td className=""><ExpandableCell content={item.address} /></td>
                      <td>{item.phone}</td>
                      <td className="">{item.city}</td>
                      <td>{item.state}</td>
                      <td>{item.zip_code}</td>
                      <td>{item.availability}</td>
                      <td className="w-25" style={{ maxWidth: "25rem" }}><ExpandableCell content={item.description} /></td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center esmeralda">Send your form and the animal shelters will call you soon</h1>
        <div className="card fondo mt-5 text-center animate__animated animate__bounceInUp" id="formcomplete">
        <div className="card-body">
          <h1 className="card-title  coloresmeralda mb-5" id="voluntaryform">
             Voluntary Form
          </h1>
          <div className="form-group row text-start">
            <div className="col-md-4">
              <label><b>Name:</b></label>
              <input
                type="text"
                className="form-control mt-2"
                name="name"
                value={store.peopleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label><b>Address:</b></label>
              <input
                type="text"
                className="form-control mt-2"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-4">
              <label><b>City:</b></label>
              <input
                type="text"
                className="form-control mt-2"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-group row mt-3 text-start">
            <div className="col-md-3">
              <label><b>Zip Code:</b></label>
              <input
                type="text"
                className="form-control mt-2"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label><b>Phone:</b></label>
              <input
                type="text"
                className="form-control mt-2"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label><b>Email:</b></label>
              <input
                type="email"
                className="form-control mt-2"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label><b>Availability:</b></label>
              <select
                className="form-control mt-2"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
              </select>
            </div>
          </div>
          <div className="form-group mt-3 text-start row d-flex justify-content-center">
            <div className="col-md-12">
              <label><b>Tell us how you would like to help</b></label>
              <textarea
                className="form-control mt-2"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <button className="btn btn-success mx-2 btn-lg mt-3" onClick={handleFormSubmit}>
                  <b>Submit</b>
                </button>
                <button onClick={handleGoHome} className="btn btn-secondary btn-lg mt-3 mx-2">
                  <b>Cancel</b>
                </button>
              </div>
          </div>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};
