import React, { useState, useEffect, useContext } from "react";
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import ExpandableCell from "./expansion";

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
    availability: "Morning", // Valor predeterminado
  };

  const [formData, setFormData] = useState(initialFormData);
  const [emailError, setEmailError] = useState(null);
  const [cityFilter, setCityFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  useEffect(() => {
    actions.getVolunteers();
    // Guarda los datos del formulario en el almacenamiento local cada vez que cambian
    localStorage.setItem("animalFormData", JSON.stringify(formData));
  }, [formData]);

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

  const valitimeEmail = (email) => {
    // Expresión regular para validar direcciones de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Validar el campo de email
    if (!valitimeEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return; // No envíes el formulario si el email no es válido
    } else {
      setEmailError(null); // Restablecer el error si el email es válido
    }
    // Aquí puedes agregar la lógica para enviar el formulario
    await actions.volunteer(
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
    navigate("/");
    // Limpiar el formulario después de enviar
    setFormData(initialFormData);
  };

  return (
    <div className="custom-container my-5">
      {(store.animalshelterId || (store.user_id && !store.peopleId && !store.animalshelterId)) ? ( //si eres protectora o eres admin (no existe animalshelter id ni peopleId)

        <div classme="rounded-top">
          <h1 className="text-center esmeralda">Volunteers</h1>
          <div className="d-flex mt-5">
            <div className="me-5 border border-4 sombra rounded-2" style={{ width: "20%", maxHeight: "300px", overflowY: "auto" }}>
              <div className="leyendadifuminado p-3 text-center" style={{ width: "100%" }}>
                <h5 className="text-light">Find faster{"\u00A0"}{"\u00A0"}{"\u00A0"}<i className="fas fa-paw text-light"></i></h5>
              </div>
              <div className="mt-2 p-3">
                <div>
                  <label><b>Select a city</b></label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="cityFilter"
                    placeholder="Filter by City"
                    value={cityFilter}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3">
                  <label><b>Availability</b></label>
                  <select
                    className="form-select mt-3"
                    name="availabilityFilter"
                    value={availabilityFilter}
                    onChange={handleInputChange}
                  >
                    <i className="fas fa-caret-down"></i>
                    <option value="" disabled>Filter by Availability</option>
                    <option value="">All</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                  </select>
                </div>
              </div>
            </div>
            <table className="table table-striped border border-4 text-center  ">
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
                    <tr className="text-center" key={item.id}>
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
      ) : (
        <div className="card fondo mt-5 text-center animate__animated animate__bounceInUp" id="formcomplete">
          <div className="card-body">
            <h1 className="card-title coloresmeralda" id="voluntaryform">
              <b>Voluntary Form</b>
            </h1>
            <div className="form-group row">
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
            <div className="form-group row mt-3">
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
                  className={`form-control mt-2 ${emailError ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
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
            <div className="form-group mt-3">
              <label><b>Tell us how you would like to help</b></label>
              <textarea
                className="form-control mt-2"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            {store.user_id ? (
              <button className="btn btn-primary mt-3" onClick={handleFormSubmit}>
                Submit
              </button>
            ) : (
              <p className="mt-5"><b>Do you want to volunteer and help in an animal shelter?  Join us, we need your help. Log in and send your form.</b></p>
            )}
          </div>
        </div>
      )}
    </div>
  );

};
