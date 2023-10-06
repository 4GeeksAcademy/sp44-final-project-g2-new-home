import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import Masonry from 'react-masonry-css';


const UploadAnimal = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [animalId, setAnimalId] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const initialType = localStorage.getItem("selectedType") || "Dog";
  const [type, setType] = useState(initialType);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mixture, setMixture] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const[file, setFile]= useState("");
  const[fileUrl, setFileUrl]= useState({});
  const [editData, setEditData] = useState({});
  const [editModeAnimals, setEditModeAnimals] = useState({});
  const [fileUrls, setFileUrls] = useState({}); // Agregar este estado para almacenar las URL de las imágenes
  const [imageChange, setImageChange] = useState(false);


  const userId = store.user_id;
  const animalshelterId = localStorage.getItem("animalshelterId");
  const peopleId = localStorage.getItem("peopleId");
  const filteredAnimals = store.filteredAnimals;
  console.log("filteredAnimals en mi componente upload:", store.filteredAnimals);
 
  
  const handleShowForm = () => {
    setShowForm(true);
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);
    if (!userId) {
    alert("You need to log in to post your animal.");
  } 
  };

  const handleImageChange = async (e) => {
    if (e.target.files.length) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFileUrl(imageUrl);
      setFileUrls({ ...fileUrls, [animalId]: imageUrl });
  
      try {
        const form = new FormData();
        form.append("img", e.target.files[0]);
  
        const response = await fetch(process.env.BACKEND_URL + "/api/img", {
          method: "POST",
          body: form,
        });
  
        const data = await response.json();
        const cloudinaryUrl = data["img_url: "];
  
        // Establece la URL de Cloudinary en el estado
        setFile(cloudinaryUrl);
        setImageChange(true);
      } catch (error) {
        console.error("Error al cargar la imagen en Cloudinary", error);
      }
    }
  };

  const handlePostImageChange = (e) => {
    if (e.target.files.length) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFileUrl(imageUrl);
      setFileUrls({ ...fileUrls, [animalId]: imageUrl });
      setFile(e.target.files[0]);
    }
  };
  

  const handleBackToPosts = () => {
    setShowForm(false); // Volver a las vistas de todas las publicaciones
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (!name || !city || !phone || !type || !description || !status || !contact) {
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
        gender: gender,
        age: age,
        mixture: mixture,
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
        setAge("") ;
        setGender("");
        setMixture("");
        setType(""); 
        setDescription(""); 
        setStatus("");
        setDate(""); 
        setContact(""); 
        setPhoto("");
        setFileUrl(""); 
        setIsActive(true); 
        setImageChange(false)
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
    setEditData({ ...editData, [animalId]: animal.photo });

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
    setFile(animal.photo);
    setAnimalId(animal.id);
    console.log("animal.id: ", animal.id)
    setAge(animal.age);
    setGender(animal.gender);
    setMixture(animal.mixture);
    setFileUrls({ ...fileUrls, [animalId]: animal.photo });
  };

  const handleCancelEdit = (animalId) => {
  // Cancela el modo de edición para el animal con el ID dado
  setEditModeAnimals({ ...editModeAnimals, [animalId]: false });
  // Restaura la URL de la imagen original desde el estado editData
  setFileUrls({ ...fileUrls, [animalId]: editData[animalId] });    
  setFileUrl("");
  };
  
  const handleSavechanges = async (e) => {
    e.preventDefault();
  
    try {
      const currentDate = new Date().toISOString().split('T')[0];
  
      
        const success = await actions.update_animal(
          animalId,
          name,
          city,
          phone,
          size,
          currentDate,
          color,
          type,
          description,
          status,
          gender,
          age,
          mixture,
          contact,
          file, // Cambia esto para pasar la URL de Cloudinary
          isActive
        );
        if (success) {
          actions.get_shelter_animals();
        }
        setEditModeAnimals({ ...editModeAnimals, [animalId]: false });
        setFile("")
        setName(""); 
        setCity(""); 
        setPhone(""); 
        setSize(""); 
        setColor(""); 
        setType(""); 
        setDescription(""); 
        setStatus("");
        setAge("") ;
        setGender("");
        setMixture("");
        setDate(""); 
        setContact(""); 
        setFileUrl("");  
        setImageChange(false)
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
    localStorage.setItem("selectedType", type);
    actions.get_shelter_animals().then(() => {
      const initialFileUrls = {};
      filteredAnimals.forEach((animal) => {
        initialFileUrls[animal.id] = animal.photo;
      });
      setFileUrls(initialFileUrls);
      
      // Verifica si estás en modo de edición y si hay un animal en edición
      const editedAnimalId = Object.keys(editModeAnimals).find((animalId) => editModeAnimals[animalId]);
      if (editedAnimalId) {
        const editedAnimal = filteredAnimals.find((animal) => animal.id === parseInt(editedAnimalId));
        
        // Restaura los valores de edición
        setName(editedAnimal.name);
        setCity(editedAnimal.city);
        setPhone(editedAnimal.phone);
        setSize(editedAnimal.size);
        setColor(editedAnimal.color);
        setType(editedAnimal.type_of_animal);
        setDescription(editedAnimal.description);
        setStatus(editedAnimal.animal_status);
        setContact(editedAnimal.contact);
        setPhoto(editedAnimal.photo);
        setAnimalId(editedAnimal.id);
        setAge(editedAnimal.age);
        setGender(editedAnimal.gender);
        setMixture(editedAnimal.mixture);
        
        // Verifica si la URL de la imagen original está en fileUrls
        // Si no está, agrégala al estado
        if (!fileUrls[editedAnimalId]) {
          setFileUrls({ ...fileUrls, [editedAnimalId]: editedAnimal.photo });
        }
      }
    });
  }, []);
  
  

  const breakpointColumnsObj = {
  default: 3,
  840: 2,
  680: 1
  };
  
  return (
    <div className="container  align-items-center">
      {showForm ? (
        // Mostrar el formulario
        <div className="card fondo mt-5 text-center mx-auto" style={{maxWidth: "60%"}}>
          <div className="card-body">
              <h2 className="coloresmeralda">
                <b>Upload an Animal</b>
              </h2> 
              {fileUrl && (
                <div className="custom-experience-preview-image custom-upload-container">
                  <img src={fileUrl} alt="" />
                </div>
              )}
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="row mt-5 d-flex text-start justify-content-center">
                <div className="col-md-4">
                  <label className="form-label"><b>Name:</b></label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control mt-1"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label"><b>City:</b></label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control mt-1"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label"><b>Phone:</b></label>
                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control mt-1"
                  />
                </div>
              </div>
              <div className="row mt-3 mb-0 d-flex text-start justify-content-center">
                <div className="col-md-4">
                  <label className="form-label"><b>Breed mixture:</b></label>
                  <input
                    type="text"
                    placeholder="Breed mixture"
                    value={mixture}
                    onChange={(e) => setMixture(e.target.value)}
                    className="form-control mt-1"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label"><b>Age:</b></label>
                  <select
                    className="form-control mt-1"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  >
                    <option value="" disabled>Select age</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senio">Senior</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label"><b>Gender:</b></label>
                  <select
                    className="form-control mt-1"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled>Select a gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3 mb-0 d-flex text-start justify-content-center">
                <div className="col-md-4">
                  <label className="form-label"><b>Size:</b></label>
                  <select
                    className="form-control mt-1"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="" disabled>Select a Size</option>
                    <option value="Large">Large</option>
                    <option value="Medium">Medium</option>
                    <option value="Small">Small</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label"><b>Color:</b></label>
                  <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="form-control mt-1"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label"><b>Type of animal</b></label>
                  <select
                    className="form-control mt-1"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {/* <option value="" disabled>Select a type of animal</option> */}
                    <option value="Dog">Dog</option>
                    {/* <option value="Cat">Cat</option> */}
                  </select>
                </div>
              </div>
                <div className="row mt-3 d-flex text-start justify-content-center">
                  <div className="col-md-4">
                    <label className="form-label"><b>Contact:</b></label>
                    <input
                      type="text"
                      placeholder="Contact information"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="form-control mt-1"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label"><b>Status:</b></label>
                    <select
                      className="form-control mt-1"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="" disabled>Select the status of animal</option>
                      {(animalshelterId !== 'false' || userId && animalshelterId === 'false' && peopleId === 'false') && (
                        <option value="Adoption">Adoption</option>
                      )} 
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                  <div className="col-md-4  d-flex flex-column">
                    <label className="form-label text-start"><b>Photo:</b></label>
                    <label htmlFor="image-input" className="btn btn-outline-dark form-control mt-1 text-start p-2 rounded-3" >
                     Upload Image
                    </label>
                    <input
                      type="file"
                      id="image-input"
                      accept="image/jpeg"
                      onChange={handlePostImageChange}
                      style={{ visibility: "hidden" }}
                    />
                  </div>
                </div>
                <div className="row d-flex text-start justify-content-center" style={{ marginTop: '-10px' }}>
                  <div className="col-md-12">
                    <label className="form-label"><b>Description:</b></label>
                    <textarea
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control mt-1"
                    ></textarea>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                  <button type="submit" className="btn btn-success btn-lg mt-2 mx-3" >
                      <b>Post</b>
                    </button>
                    <button onClick={handleBackToPosts} className="btn btn-secondary btn-lg mt-2 mx-3">
                      <b>Cancel</b>
                    </button>
                  </div>
                </div>    
            </form>
          </div>
        </div>
      ) : (
        // Mostrar las vistas de todas las publicaciones
        <div className="row">
          <h2 className="mt-5 text-center mb-4 esmeralda">These are your animals</h2>
          <div className="d-flex">
          {!showForm && (
            <button onClick={handleShowForm} className="btn btn-success btn-lg my-5 mx-auto">
              <b>Upload your animal here</b>
            </button>
          )}
          </div>
          {filteredAnimals ? (
          <div className="container">
            <div className="card row fondo p-3 py-5">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {filteredAnimals.map((animal) => (
                  <div className="col-sm-6 col-lg-4 mb-4" key={animal.id}>
                    <div className="card col-sm-6 col-lg-4 custom-card ">


                    {editModeAnimals[animal.id] ? (
                      // Mostrar vista previa de la imagen en modo de edición
                      fileUrls[animal.id] && (
                        <div className="custom-experience-preview-image custom-upload-container">
                          <img
                            src={(fileUrls[animal.id] || fileUrls[animal.id] !== null || fileUrls[animal.id] !== ""  || file) ? fileUrls[animal.id] : animal.photo}
                            alt="Preview"
                            className="card-img-top"
                          />

                        </div>
                      )
                    ) : (
                      // Mostrar la imagen real cuando no estás en modo de edición
                      <img
                        src={animal.photo}
                        alt={`Image for ${animal.name}`}
                        className="card-img-top"
                      />
                    )}             
                      <div className="card-body">                         
                        {editModeAnimals[animal.id] ? (
                          // Mostrar campos editables cuando está en modo de edición
                          <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="row d-flex text-start justify-content-start">
                              <div className="col-1"></div>
                              <div className="col-md-6 mt-4 text-light text-start">
                                <label className="form-label text-dark text-start"><b>Photo:</b></label>
                                <label htmlFor="image-input" className="btn btn-outline-dark" >
                                 Upload Image
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
                            <div className="row text-start d-flex  justify-content-center" style={{marginTop:"-10px"}}>
                              <div className="col-md-10">
                                <label htmlFor="name"><b>Name:</b></label>
                                <input
                                  type="text"
                                  id="name"
                                  placeholder="Name"
                                  className="form-control mb-3"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="mixture"><b>Breed mixture:</b></label>
                                <input
                                  type="text"
                                  id="mixture"
                                  placeholder="Breed mixture"
                                  className="form-control mb-3"
                                  value={mixture}
                                  onChange={(e) => setMixture(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="age"><b>Age:</b></label>
                                <select
                                  id="age"
                                  className="form-control mb-3"
                                  value={age}
                                  onChange={(e) => setAge(e.target.value)}
                                >
                                  <option value="" disabled>Select age</option> 
                                  <option value="Baby">Baby</option>
                                  <option value="Young">Young</option>
                                  <option value="Adult">Adult</option>
                                  <option value="Senior">Senior</option>
                                </select>
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="gender"><b>Gender:</b></label>
                                <select
                                  id="gender"
                                  className="form-control mb-3"
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <option value="" disabled>Select a gender</option> 
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="city"><b>City:</b></label>
                                <input
                                  type="text"
                                  id="city"
                                  placeholder="City"
                                  className="form-control mb-3"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="size"><b>Size:</b></label>
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
                              </div>
                            </div>
                            <div className="row  text-start d-flex justify-content-center">
                              <div className="col-md-10 ">
                                <label htmlFor="color"><b>Color:</b></label>
                                <input
                                  type="text"
                                  id="color"
                                  className="form-control mb-3"
                                  placeholder="Color"
                                  value={color}
                                  onChange={(e) => setColor(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="status"><b>Animal Status:</b></label>
                                <select
                                  id="status"
                                  className="form-control mb-3"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  <option value="" disabled>Select the status of animal</option> 
                                  {(animalshelterId !== 'false' || userId && animalshelterId === 'false' && peopleId === 'false') && (
                                    <option value="Adoption">Adoption</option>
                                  )}
                                  <option value="Found">Found</option>
                                  <option value="Lost">Lost</option>

                                  
                                </select>
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="phone"><b>Phone:</b></label>
                                <input
                                  type="text"
                                  id="phone"
                                  className="form-control mb-3"
                                  placeholder="Phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10"> 
                                <label htmlFor="contact"><b>Contact information:</b></label>
                                <input
                                  type="text"
                                  id="contact"
                                  placeholder="Contact information"
                                  value={contact}
                                  className="form-control mb-3"
                                  onChange={(e) => setContact(e.target.value)}
                                />
                              </div> 
                            </div>
                            <div className="row d-flex text-start justify-content-center">
                              <div className="col-md-10">
                                <label htmlFor="description"><b>Description:</b></label>
                                <textarea
                                  id="description"
                                  placeholder="Description"
                                  value={description}
                                  className="form-control mb-3"
                                  onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                            <div className="row">                          
                              <div className="col-md-12 text-center">
                                <button
                                  className="btn btn-success mt-2 mx-2"
                                  onClick={(e) => handleSavechanges(e, animal.id)}
                                >
                                  <b>Save</b>
                                </button>
                                <button
                                  className="btn btn-secondary mt-2 mx-2"
                                  onClick={() => handleCancelEdit(animal.id)}
                                >
                                  <b>Cancel</b>
                                </button>
                              </div>                                               
                            </div> 
                          </form>
                        ) : (
                          // Mostrar información no editable cuando no está en modo de edición
                          <div className=" my-0">
                            <h4 className="card-title text-center mb-4"><b>{animal.name}</b></h4>
                            <p className="card-text text-start "><b>Breed Mixture: </b>{animal.mixture}</p>
                            <p className="card-text text-start "><b>Gender: </b>{animal.gender}</p>
                            <p className="card-text text-start "><b>Age: </b>{animal.age}</p>
                            <p className="card-text  text-start"><b>City: </b>{animal.city}</p>
                            <p className="card-text  text-start"><b>Size Type: </b>{animal.size}</p>
                            <p className="card-text  text-start"><b>Color: </b>{animal.color}</p>
                            {/* <p className="card-text  text-start">Type of Animal: {animal.type_of_animal}</p> */}
                            <p className="card-text  text-start"><b>Animal Status: </b>{animal.animal_status}</p>
                            <p className="card-text  text-start"><b>Phone: </b>{animal.phone}</p>
                            <p className="card-text  text-start"><b>Contact: </b>{animal.contact}</p>
                            <p className="card-text  text-start"><b>Description: </b>{animal.description}</p>
                            <p className="card-text  text-start"><b>Date: </b>{animal.date}</p>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-12  text-center">
                                  <button
                                    className="btn btn-success mt-2 mx-2"
                                    onClick={() => handleEdit(animal.id)}
                                  >
                                    <b>Edit</b>
                                  </button>
                                  <button
                                    className="btn btn-danger mt-2 mx-2"
                                    onClick={() => handleDelete(animal.id)}
                                  >
                                    <b>Delete</b>
                                  </button>                                
                                </div>
                                                              
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
          </div>
          ) : (
            <p>No animals available.</p>
          )}
        </div> 
      )}
    </div>
  );
};



export default UploadAnimal;
