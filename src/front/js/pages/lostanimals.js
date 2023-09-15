import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/lostanimals.css";

export const Lostanimals = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("lost");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(() => {
    // Intenta cargar los datos del formulario desde el almacenamiento local al cargar la página
    const savedFormData = localStorage.getItem("animalFormData");
    return savedFormData ? JSON.parse(savedFormData) : {
      name: "",
      city: "",
      phone: "",
      color: "",
      animalType: "gato",
      date: "",
      email: "",
      description: "",
      size: "small",
    };
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [animalListLost, setAnimalListLost] = useState([]);
  const [animalListFound, setAnimalListFound] = useState([]);
  const [publishedAnimalsLost, setPublishedAnimalsLost] = useState([]);
  const [publishedAnimalsFound, setPublishedAnimalsFound] = useState([]);
  const [emailError, setEmailError] = useState(null); // Variable de estado para el error de email

  useEffect(() => {
    // Guarda los datos del formulario en el almacenamiento local cada vez que cambian
    localStorage.setItem("animalFormData", JSON.stringify(formData));
  }, [formData]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const validateEmail = (email) => {
    // Expresión regular para validar direcciones de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFormSubmit = () => {
    // Validar el campo de email
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return; // No envíes el formulario si el email no es válido
    } else {
      setEmailError(null); // Restablecer el error si el email es válido
    }

    const newAnimal = {
      ...formData,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };

    if (activeTab === "lost") {
      setAnimalListLost([...animalListLost, newAnimal]);
      setPublishedAnimalsLost([...publishedAnimalsLost, newAnimal]);
    } else {
      setAnimalListFound([...animalListFound, newAnimal]);
      setPublishedAnimalsFound([...publishedAnimalsFound, newAnimal]);
    }

    // Limpiar el formulario después de enviar
    setFormData({
      name: "",
      city: "",
      phone: "",
      color: "",
      animalType: "gato",
      date: "",
      email: "",
      description: "",
      size: "small",
    });
    setSelectedFile(null);
  };

  const generateIntroText = (animal) => {
    return `Greetings,
  
  My name is ${animal.name}, and I currently reside in ${animal.city}.
  I am a ${animal.size}, ${animal.color} ${animal.animalType} in need of assistance. I can be reached at ${animal.phone}.
  
  ${animal.description}
  
  I went missing on ${animal.date}, and I kindly request your help in reuniting me with my family. Below, you can find a photo of me.
  
  Thank you for your attention and support.
  
  Sincerely,
  ${animal.name}`;
  };
 
  return (
    <div id="lostanimals-container" className="container text-center">
      <h1 id="lostanimals">{activeTab === "lost" ? "Lost Animals" : "Found Animals"}</h1>
      <button id="add-button" className="btn btn-primary" onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Animal"}
      </button>
      {showForm && (
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Animal {activeTab === "lost" ? "Lost" : "Found"} Form</h5>
            <div className="form-group row">
              <div className="col-md-3">
                <label>Pet´s name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label>City:</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label>Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label>Size:</label>
                <select
                  className="form-control"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-3">
                <label>Color:</label>
                <input
                  type="text"
                  className="form-control"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label>Type of Animal:</label>
                <select
                  className="form-control"
                  name="animalType"
                  value={formData.animalType}
                  onChange={handleInputChange}
                >
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
              </div>
              <div className="col-md-3">
                <label>Email:</label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>
              <div className="col-md-3">
                <label>Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload Photo:</label>
              <input
                type="file"
                className="form-control-file"
                onChange={handleFileChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="card text-center">
        <div className="card-header">
          <button
            className={`btn ${activeTab === "lost" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveTab("lost")}
          >
            Lost Animals
          </button>
          <button
            className={`btn ${activeTab === "found" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveTab("found")}
          >
            Found Animals
          </button>
        </div>
        <div className="card-body">
          {activeTab === "lost" ? (
            publishedAnimalsLost.map((animal, index) => (
              <div key={index}>
                <p>{generateIntroText(animal)}</p>
                <p>Description: {animal.description}</p>
                {animal.image && <img src={animal.image} alt={`Animal ${index}`} />}
                <hr />
              </div>
            ))
          ) : (
            publishedAnimalsFound.map((animal, index) => (
              <div key={index}>
                <p>{generateIntroText(animal)}</p>
                <p>Name: {animal.name}</p>
                <p>City: {animal.city}</p>
                <p>Phone: {animal.phone}</p>
                <p>Color: {animal.color}</p>
                <p>Type of Animal: {animal.animalType}</p>
                <p>Date: {animal.date}</p>
                <p>Description: {animal.description}</p>
                {animal.image && <img src={animal.image} alt={`Animal ${index}`} />}
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
