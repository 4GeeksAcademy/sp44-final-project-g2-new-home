import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import Masonry from "react-masonry-css";

export const Lostanimals = () => {
  const { store, actions } = useContext(Context);
  const [activeTab, setActiveTab] = useState("lost");
  const [selectedFile, setSelectedFile] = useState(null);
  const [animalListLost, setAnimalListLost] = useState([]);
  const [animalListFound, setAnimalListFound] = useState([]);
  const [name, setName] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [editData, setEditData] = useState({});
  const [editModeAnimals, setEditModeAnimals] = useState({});
  const [status, setStatus] = useState("Lost");

  useEffect(() => {
    actions.get_all_animals()
  }, []);

  const handleShowForm = () => {
    if (!userId) {
      alert("You need to log in to post your animal.");
    } else {
      setShowForm(true);
      const currentDate = new Date().toLocaleDateString();
      setDate(currentDate);
    }

  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFileUrl(imageUrl); // Actualizar el estado de la vista previa de la imagen
      setFile(e.target.files[0]);
    }
  };
  
 
  const handleBackToPosts = () => {
    setShowForm(false); 
    setFileUrl(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !city || !phone || !type || !description || !status || !contact || !file) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const form = new FormData();
      form.append("img", file);

      const response = await fetch(process.env.BACKEND_URL + "/api/img", {
        method: "POST",
        body: form
      });

      const data = await response.json();
      const imageUrl = data["img_url: "];

      console.log("data fetch img: ", data);
      console.log("imageUUUUUUUUURL: ", imageUrl)

      const currentDate = new Date().toISOString().split('T')[0];

      const animalData = {
        name,
        city,
        phone,
        size: size,
        color,
        typeOfAnimal: type,
        description,
        animalStatus: status,
        date: currentDate,
        contact,
        photo: imageUrl,
        isActive,
        user_id: userId,
      };
      console.log("Datos del animal que se envian: ", animalData)

      // Llamar a la función del store para publicar el animal
      const success = await actions.publishAnimal(animalData);
      if (success) {
        await actions.get_all_animals();

        setShowForm(false);
        setName("");
        setCity("");
        setPhone("");
        setSize("");
        setColor("");
        setType("");
        setDescription("");
        setStatus("");
        setDate("");
        setContact("");
        setPhoto("");
        setFileUrl("");
        setIsActive(true);
      }
    } catch (e) {
      console.error("ERROR IMAGEN", e);
    }
  };

  const handleEdit = (animalId) => {
    // Activa el modo de edición para el animal con el ID dado
    setEditModeAnimals({ ...editModeAnimals, [animalId]: true });

    // Pobla los campos editables con los valores actuales del animal
    const animal = filteredAnimals.find((a) => a.id === animalId);
    setName(animal.name);
    console.log("name: ", animal.name)
    setCity(animal.city);
    console.log("city: ", animal.city)
    setPhone(animal.phone);
    console.log("phone: ", animal.phone)
    setSize(animal.size);
    console.log("size: ", animal.size)
    setColor(animal.color);
    setType(animal.type_of_animal);
    console.log("type: ", type)
    setDescription(animal.description);
    console.log("description: ", animal.description)
    setStatus(animal.animal_status);
    console.log("status: ", animal.animal_status)
    setContact(animal.contact);
    console.log("animal.contact: ", animal.contact)
    setPhoto(animal.photo);
    console.log("animal.photo: ", animal.photo)
    setAnimalId(animal.id);
    console.log("animal.id: ", animal.id)
  };
  const handleEditImage = (e) => {
    if (e.target.files.length) {
      setEditData({ ...editData, photo: e.target.files[0] });
    }
  };
 

  const handleCancelEdit = (animalId) => {
    // Cancela el modo de edición para el animal con el ID dado
    setEditModeAnimals({ ...editModeAnimals, [animalId]: false });
  };

  const userId = store.user_id;

  const breakpointColumnsObj = {
    default: 3,
    470: 2,
    380: 1
  };


  return (
    <div className="container text-center">
    {!showForm && (
      <div>
        <h1 className="esmeralda" id="lostanimals">
          Have you lost your pet?
        </h1>
        <button onClick={handleShowForm} className="btn btn-success btn-lg mb-5 mt-5">
          <b>Add your pet here</b>
        </button>
      </div>
    )}
     {showForm ? (
      <div className="container">
        <div className="">
          <div className="card row mt-5 fondo">
            <h2 className="coloresmeralda my-3">
              <b>Add Your Animal</b>
            </h2>
            {fileUrl && (
              <div className="preview-image">
                <img src={fileUrl} alt="Preview" />
              </div>
            )} 

            <div className="input-fields">
              <form onSubmit={handleSubmit}>
                <div className="row mt-5 text-start d-flex justify-content-center">
                  <div className="col-md-3">
                    <label><b>Name:</b></label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label><b>City:</b></label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label><b>Phone:</b></label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label><b>Size Type:</b></label>
                    <select
                      className="form-control mt-2"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="" disabled>Select a Size</option>
                      <option value="Large">Large</option>
                      <option value="Medium">Medium</option>
                      <option value="Small">Small</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3 d-flex text-start justify-content-center">
                  <div className="col-md-3">
                    <label><b>Color:</b></label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label><b>Type of Animal:</b></label>
                    <select
                      className="form-control mt-2"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" disabled>Select a type of animal</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label><b>Contact information:</b></label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Contact information"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label><b>Status:</b></label>
                    <select
                      className="form-control mt-2"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="" disabled>Select the status of animal</option>
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-3 text-start">
                  <div className="col-md-9">
                    <label><b>Description:</b></label>
                    <textarea
                      placeholder="Description"
                      className="form-control mt-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col-md-3 text-light  preview-image d-flex flex-column">
                    <label className="form-label text-start text-dark"><b>Photo:</b></label>
                    <label htmlFor="image-input" className="btn btn-dark p-2 rounded-3">
                      <b>Upload Image</b>
                    </label>
                    <input
                      type="file"
                      id="image-input"
                      accept="image/jpeg"
                      onChange={handleImageChange}
                      style={{ visibility: "hidden" }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <button onClick={handleBackToPosts} className="btn btn-secondary btn-lg mt-2 me-3" style={{ width: "80px" }}>
                      <b>Cancel</b>
                    </button>
                    <button type="submit" className="btn btn-success btn-lg mt-2 me-3" style={{ width: "6%", height: "83%" }}>
                      <b>Post</b>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="card text-center fondo pt-4">
        <div className="lost-card card-header border-0 py-4">
          <button
            className={`btn btn-lg me-3 ${activeTab === "lost" ? "btn-green" : "btn-white"}`}
            onClick={() => setActiveTab("lost")}
          >
            <b>Lost Animals</b>
          </button>
          <button
            className={`btn btn-lg ${activeTab === "found" ? "btn-green" : "btn-white"}`}
            onClick={() => setActiveTab("found")}
          >
            <b>Found Animals</b>
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {store.animals.map((animal) => {
                // Filtrar los animales según el estado activo
                if (activeTab === "lost" && animal.animal_status === "Lost") {
                  return (
                    <div className="col-md-4 mb-4" key={animal.id}>
                      <div className="custom-card card">
                        {animal.photo ? (
                          <img
                            src={animal.photo}
                            alt={`Image for ${animal.name}`}
                            className="card-img-top"
                          />
                        ) : (
                          <img
                            src="/placeholder-image.jpg"
                            alt="Image not available"
                            className="card-img-top"
                          />
                        )}
                        <div className="card-body">
                          <h4 className="card-title">Name: {animal.name}</h4>
                          <p className="card-text">City: {animal.city}</p>
                          <p className="card-text">Phone: {animal.phone}</p>
                          <p className="card-text">Size Type: {animal.size}</p>
                          <p className="card-text">Color: {animal.color}</p>
                          <p className="card-text">Type of Animal: {animal.type_of_animal}</p>
                          <p className="card-text">Description: {animal.description}</p>
                          <p className="card-text">Animal Status: {animal.animal_status}</p>
                          <p className="card-text">Contact: {animal.contact}</p>
                          <p className="card-text">Date: {animal.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                } else if (activeTab === "found" && animal.animal_status === "Found") {
                  return (
                    <div className="col-md-4 mb-4" key={animal.id}>
                      <div className="card custom-card">
                        {animal.photo ? (
                          <img
                            src={animal.photo}
                            alt={`Image for ${animal.name}`}
                            className="card-img-top"
                          />
                        ) : (
                          <img
                            src="/placeholder-image.jpg"
                            alt="Image not available"
                            className="card-img-top"
                          />
                        )}
                        <div className="card-body">
                          <h4 className="card-title">Name: {animal.name}</h4>
                          <p className="card-text">City: {animal.city}</p>
                          <p className="card-text">Phone: {animal.phone}</p>
                          <p className="card-text">Size Type: {animal.size}</p>
                          <p className="card-text">Color: {animal.color}</p>
                          <p className="card-text">Type of Animal: {animal.type_of_animal}</p>
                          <p className="card-text">Description: {animal.description}</p>
                          <p className="card-text">Animal Status: {animal.animal_status}</p>
                          <p className="card-text">Contact: {animal.contact}</p>
                          <p className="card-text">Date: {animal.date}</p>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null; // No mostrar la tarjeta si no coincide con activeTab y animal_status
              })}
            </Masonry>
          </div>
        </div>
      </div>
      )}
    </div>
  );
  
};
