import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/lostanimals.css";

export const Lostanimals = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("lost");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [color, setColor] = useState("");
  const [animalType, setAnimalType] = useState("gato");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [animalListLost, setAnimalListLost] = useState([]);
  const [animalListFound, setAnimalListFound] = useState([]);
  const [size, setSize] = useState("small");
  const [publishedAnimalsLost, setPublishedAnimalsLost] = useState([]);
  const [publishedAnimalsFound, setPublishedAnimalsFound] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleNameChange = (e) => {
    setName(e.target.value.slice(0, 20));
  };

  const handleCityChange = (e) => {
    setCity(e.target.value.slice(0, 80));
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.slice(0, 20));
  };

  const handleColorChange = (e) => {
    setColor(e.target.value.slice(0, 20));
  };

  const handleAnimalTypeChange = (e) => {
    setAnimalType(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleContactChange = (e) => {
    setContact(e.target.value.slice(0, 1000));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.slice(0, 1000));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFormSubmit = () => {
    const newAnimal = {
      name: name,
      city: city,
      phone: phone,
      color: color,
      animalType: animalType,
      date: date,
      contact: contact,
      description: description,
      size: size,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
    };

    if (activeTab === "lost") {
      setAnimalListLost([...animalListLost, newAnimal]);
      setPublishedAnimalsLost([...publishedAnimalsLost, newAnimal]);
    } else {
      setAnimalListFound([...animalListFound, newAnimal]);
      setPublishedAnimalsFound([...publishedAnimalsFound, newAnimal]);
    }

    // Resto del código para limpiar los campos del formulario
    setName("");
    setCity("");
    setPhone("");
    setColor("");
    setAnimalType("gato");
    setDate("");
    setContact("");
    setDescription("");
    setSelectedFile(null);
    setSize("small"); // Restablece el tamaño a "small" por defecto
  };

  const generateIntroText = (animal) => {
    return `Hola amigos, me llamo ${animal.name}, vivo en ${animal.city} y tengo un ${animal.size} ${animal.color} ${animal.animalType}. ¡Necesito tu ayuda! Mi contacto es ${animal.contact}, y esta es mi descripción: ${animal.description}. ¡Mira mi foto a continuación!`;
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
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div className="col-md-3">
                <label>City:</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={handleCityChange}
                />
              </div>
              <div className="col-md-3">
                <label>Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="col-md-3">
                <label>Size:</label>
                <select
                  className="form-control"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
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
                  value={color}
                  onChange={handleColorChange}
                />
              </div>
              <div className="col-md-3">
                <label>Type of Animal:</label>
                <select
                  className="form-control"
                  value={animalType}
                  onChange={handleAnimalTypeChange}
                >
                  <option value="gato">Gato</option>
                  <option value="perro">Perro</option>
                </select>
              </div>
              <div className="col-md-3">
                <label>Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
              <div className="col-md-3">
                <label>Contact:</label>
                <input
                  type="text"
                  className="form-control"
                  value={contact}
                  onChange={handleContactChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                className="form-control"
                value={description}
                onChange={handleDescriptionChange}
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
          <h5 className="card-title">Example Content for {activeTab === "lost" ? "Lost" : "Found"} Animals</h5>
          <p className="card-text">This is the content of {activeTab === "lost" ? "lost" : "found"} animals.</p>
          {activeTab === "lost" ? (
            publishedAnimalsLost.map((animal, index) => (
              <div key={index}>
                <p>{generateIntroText(animal)}</p>
                {/* <p>Name: {animal.name}</p>
                <p>City: {animal.city}</p> */}
                <p>Phone: {animal.phone}</p>
                {/* <p>Color: {animal.color}</p>
                <p>Type of Animal: {animal.animalType}</p> */}
                <p>Date: {animal.date}</p>
                {/* <p>Contact: {animal.contact}</p> */}
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
                <p>Contact: {animal.contact}</p>
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
