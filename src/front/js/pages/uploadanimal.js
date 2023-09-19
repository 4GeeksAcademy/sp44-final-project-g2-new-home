import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/experiences.css";

const UploadAnimal = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const[file, setFile]= useState("");
  const[fileUrl, setFileUrl]= useState("");
  const [editData, setEditData] = useState({});
  const [editModeAnimals, setEditModeAnimals] = useState({});


  const userId = store.user_id;
  const shelterId = store.animalshelterId;
  const filteredAnimals = store.filteredAnimals;
  console.log("user_id delc componente:", userId);
  console.log("filteredAnimals en mi componente upload:", store.filteredAnimals);
 
  
  const handleShowForm = () => {
    if (userId && shelterId) {
      setShowForm(true);
      const currentDate = new Date().toLocaleDateString();
      setDate(currentDate); // Mostrar el formulario solo si el usuario está autenticado
    } else if (!userId) {
      // Mostrar un alert si el usuario no está autenticado
      alert("You need to log in to post your animal.");
    } else if (!shelterId) {
      alert("You do not have permission to publish");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length){
      setFile(e.target.files[0]);
      console.log("evento imagen: ", e.target.files);
    }
  };

  const handleBackToPosts = () => {
    setShowForm(false); // Volver a las vistas de todas las publicaciones
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
        await actions.get_shelter_animals();
        
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
  
  const handleSavechanges = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const form = new FormData();
      form.append("img", file);
      console.log("Este es el form:", form)

      const response = await fetch(process.env.BACKEND_URL + "/api/img", {
        method: "POST",
        body: form
      });

      const data = await response.json();
      const imageUrl = data["img_url: "];
      const currentDate = new Date().toISOString().split('T')[0];

      console.log("data fetch img: ", data);
      console.log("imageUUUUUUUUURL: ", imageUrl)
      

      const success = await actions.update_animal(animalId, name, city, phone, size, currentDate, color, type, description, status, contact, imageUrl, isActive);
      if (success) {

        actions.get_shelter_animals();
      }
      setEditModeAnimals({ ...editModeAnimals, [animalId]: false });
    } catch (e) {
      console.error("ERROR IMAGEN", e);
    }
  };

  const handleDelete = async (animalId) => {
    if (window.confirm("Are you sure you want to delete this animal?")) {
      // La confirmación del usuario es requerida para evitar eliminaciones accidentales
      const success = await actions.delete_animal(animalId);
      if (success) {
        actions.get_shelter_animals(); 
      } else {
        alert("Failed to delete the animal. Please try again later.");
      }
    }
  };
  
  useEffect(() => {
    actions.get_shelter_animals();
  }, []);

  
  
  return (
    <div className="container">
      {showForm ? (
        // Mostrar el formulario
        <div className="container">
          <div className="experiences-container">
            <div className="experience-post">
              <h2>
                <b>Upload an Animal</b>
              </h2>
              <div className="image-upload">
                <input
                  type="file"
                  id="image-input"
                  accept="image/jpeg"
                  onChange={handleImageChange}
                />
              </div>
              <div className="input-fields">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <select
                  className="form-control mb-3"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="" disabled>Select a Size</option>
                  <option value="Large">Large</option>
                  <option value="Medium">Medium</option>
                  <option value="Small">Small</option>
                </select>
                <input
                  type="text"
                  placeholder="Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <select
                  className="form-control mb-3"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>Select a type of animal</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <select
                  className="form-control mb-3"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>Select the status of animal</option> 
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
                <input
                  type="hidden"
                  name="date"
                  value={new Date().toLocaleDateString()}
                />
                <input
                  type="text"
                  placeholder="Contact information"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <div>
                <button onClick={handleBackToPosts} className="me-3"  style={{ width: "80px" }} id="post">
                  Cancel
                </button>
                <button onClick={handleSubmit} style={{ width: "80px" }} id="post">
                  Post
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Mostrar las vistas de todas las publicaciones
        <div className="row">
          <h2 className="mt-4 mb-4">These are your animals</h2>
          {filteredAnimals ? (
            filteredAnimals.map((animal) => (
              <div className="col-md-4 mb-4" key={animal.id}>
                <div className="card">
                  {animal.photo ? (
                    <img
                      src={animal.photo}
                      alt={`Image for ${animal.name}`}
                      className="card-img-top"
                      onChange={handleImageChange}
                    />
                  ) : (
                    <img
                      src="/placeholder-image.jpg"
                      alt="Image not available"
                      className="card-img-top"
                    />
                  )}
                  <div className="card-body">
                    {editModeAnimals[animal.id] ? (
                      // Mostrar campos editables cuando está en modo de edición
                      <div className="input-fields">
                        <label htmlFor="img">Photo:</label>
                        <input
                          type="file"
                          accept="image/jpeg"
                          onChange={handleImageChange}
                        />
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          id="city"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />

                        <label htmlFor="phone">Phone:</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />

                        <label htmlFor="size">Size Type:</label>
                        <select
                          id="size"
                          className="form-control mb-3"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          <option value="" disabled>Select a Size</option> 
                          <option value="Large">Large</option>
                          <option value="Medium">Medium</option>
                          <option value="Small">Small</option>
                        </select>

                        <label htmlFor="color">Color:</label>
                        <input
                          type="text"
                          id="color"
                          placeholder="Color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />

                        <label htmlFor="type">Type of Animal:</label>
                        <select
                          id="type"
                          className="form-control mb-3"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="" disabled>Select a type of animal</option> 
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                        </select>

                        <label htmlFor="description">Description:</label>
                        <textarea
                          id="description"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>

                        <label htmlFor="status">Animal Status:</label>
                        <select
                          id="status"
                          className="form-control mb-3"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="" disabled>Select the status of animal</option> 
                          <option value="Lost">Lost</option>
                          <option value="Found">Found</option>
                        </select>

                        <label htmlFor="contact">Contact information:</label>
                        <input
                          type="text"
                          id="contact"
                          placeholder="Contact information"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                        <label htmlFor="date">Date:</label>
                        <input
                          type="text"
                          id="date"
                          placeholder={animal.date}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          readOnlygit 
                        />
                        <div>
                          <button
                            className="btn btn-danger me-3"
                            onClick={() => handleCancelEdit(animal.id)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={(e) => handleSavechanges(e, animal.id)}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Mostrar información no editable cuando no está en modo de edición
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
                        <div className="card-body">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(animal.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-3"
                            onClick={() => handleDelete(animal.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No animals available.</p>
          )}
        </div>
      )}

      {!showForm && (
        <button onClick={handleShowForm} className="btn btn-primary">
          Upload your animal here
        </button>
      )}
    </div>
  );
};



export default UploadAnimal;
