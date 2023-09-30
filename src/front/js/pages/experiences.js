import React, { useState, useContext, useEffect } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";
import Masonry from "react-masonry-css";


export const Experiences = () => {
  const { actions, store } = useContext(Context);
  // const [experiences, setExperiences] = useState([]); // Store published experiences
  const [title, setTitle] = useState(localStorage.getItem("experienceTitle") ?? "");
  const [body, setBody] = useState(localStorage.getItem("experienceBody") ?? "");
  const [photolist, setPhotolist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const[file, setFile]= useState("");
  const[fileUrl, setFileUrl]= useState(localStorage.getItem("experienceFileUrl") ?? "");
  const [likedExperiences, setLikedExperiences] = useState(new Set());

  const peopleId = store.peopleId; 
  const userId = store.user_id;
  const shelterId = localStorage.getItem("animalshelterId");

  const handleShowForm = () => {
    if (peopleId) {
      setShowForm(true); 
    } else if (!userId) {
      alert("You need to log in to post your experience.");
    } else if (shelterId != null || (shelterId && peopleId === null)) {
      alert("You do not have permission to publish");
    }
      const experienceToEdit = store.experiences.find((experience) => experience.id === store.experienceId);
      if(experienceToEdit){
        localStorage.setItem("experienceTitle", experienceToEdit.title);
        localStorage.setItem("experienceBody", experienceToEdit.body);
        localStorage.setItem("experienceFileUrl", experienceToEdit.photo);
        setFileUrl(experienceToEdit.photo);
        setTitle(experienceToEdit.title );
        setBody(experienceToEdit.body );
      }
  };
  
  
  
  const handleBackToPosts = () => {
    setShowForm(false); 
    setFileUrl(false);
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFileUrl(imageUrl); // Actualizar el estado de la vista previa de la imagen
      setFile(e.target.files[0]);
    }
  };
  
  const handleEdit = () => {
  if (isEditing) {
    // Si estamos en modo de edición, desactiva la edición
    setIsEditing(false);
    // También podrías restablecer los valores de los campos aquí si lo deseas
  } else {
    // Si no estamos en modo de edición, activa la edición
    setIsEditing(true);
    // Aquí puedes cargar los detalles de la experiencia actual en los campos de entrada
    // Por ejemplo, puedes buscar la experiencia en 'experiences' por su ID y establecer 'title' y 'body' en los estados correspondientes
  }
};


  const handleLikeClick = (id) => {
    if (likedExperiences.has(id)) {
      likedExperiences.delete(id);
    } else {
      likedExperiences.add(id);
    }
    setLikedExperiences(new Set(likedExperiences)); // Update to trigger a re-render
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (experienceId === 'false') {
    if (!title || !body || !file) {
      alert("Please fill in all required fields (Title, Description, and Image).");
      return;
    }
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
    const id = store.experienceId;
    console.log("data fetch img: ", data);
    console.log("imageUUUUUUUUURL: ", imageUrl)

    if (store.experienceId) {
      // Llama a la función de actualizar
      const success = await actions.update_experience(id, title, body, imageUrl);
      if (success) {
        const experienceToEdit = store.experiences.find((experience) => experience.id === store.experienceId);
        if(experienceToEdit){
          localStorage.setItem("experienceTitle", experienceToEdit.title);
          localStorage.setItem("experienceBody", experienceToEdit.body);
          localStorage.setItem("experienceFileUrl", experienceToEdit.photo);
          setFileUrl(experienceToEdit.photo);
          setTitle(experienceToEdit.title );
          setBody(experienceToEdit.body );}
        actions.get_experiences();
      }
    } else {
      // Llama a la función de publicar si no hay experiencia ID
      const success = await actions.publishExperience(title, body, imageUrl, peopleId);
      if (success) {
        const experienceToEdit = store.experiences.find((experience) => experience.id === store.experienceId);
        if(experienceToEdit){
          localStorage.setItem("experienceTitle", experienceToEdit.title);
          localStorage.setItem("experienceBody", experienceToEdit.body);
          localStorage.setItem("experienceFileUrl", experienceToEdit.photo);
          setFileUrl(experienceToEdit.photo);
          setTitle(experienceToEdit.title );
          setBody(experienceToEdit.body );}
        actions.get_experiences();
      }
    }

    setShowForm(false);
    setTitle("");
    setBody("");
    setFileUrl(""); // Limpia la URL de la imagen después de usarla
  } catch (e) {
    console.error("ERROR IMAGEN", e);
  }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      // La confirmación del usuario es requerida para evitar eliminaciones accidentales
      const success = await actions.delete_experience(store.experienceId);
      if (success) {
        actions.get_experiences(); // Vuelve a cargar las experiencias después de eliminar
        setShowForm(false); // Oculta el formulario después de eliminar
        setTitle("");
        setBody("");
        setPhotolist([]);
        setFileUrl("");
        localStorage.setItem("experienceId", 'false') 
      } else {
        alert("Failed to delete the experience. Please try again later.");
      }
    }
  };

  useEffect(() => {
    actions.get_experiences();
    console.log("store.experienceId:", store.experienceId);

  }, []);

  const breakpointColumnsObj = {
    default: 3,
    470: 2,
    380: 1
  };

  const experienceId = localStorage.getItem("experienceId")

  return (
    <div className="container">
      {showForm ? (
        // Mostrar el formulario
        <div className="card fondo mt-5 text-center mx-auto" style={{maxWidth: "60%"}}>
          <div className="card-body">
              <h2 className="card-title coloresmeralda text-center my-3">
                <b>{ experienceId == 'false' ? "Publish an experience" : "Update your experience"}</b>
              </h2>
              
              {fileUrl && (
                <div className="custom-experience-preview-image custom-upload-container">
                  <img src={fileUrl} alt="Preview" />
                </div>
              )} 
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="row mt-5 d-flex text-start justify-content-center">
                      <div className="col-md-10">
                        <label className="form-label"><b>Title:</b></label>
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={handleTitleChange}
                          className="form-control mt-3"
                        />
                      </div>
                      <div className="col-md-10 mt-3 mb-3">
                        <label className="form-label"><b>Description:</b></label>
                        <textarea
                          placeholder="Description"
                          value={body}
                          onChange={handleDescriptionChange}
                          className="form-control mt-3"
                        ></textarea>
                      </div>
                  </div>
              { experienceId === 'false' ? (
              <div className="container mt-3">
                <div className="row"> 
                  <div className="col-md-3 text-light   custom-experience-preview-image text-center custom-upload-container">
                    <label htmlFor="image-input" className="btn btn-dark" >
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
                <div className="row d-flex justify-content-center">
                    <div className="col-md-2 py-2">
                      <button onClick={handleBackToPosts} className="btn btn-lg btn-secondary" >
                          <b>Cancel</b>
                      </button>
                    </div>
                    <div className="col-md-2 py-2">
                      <button onClick={handleSubmit} className="btn btn-lg btn-success">
                          <b>Send</b>
                      </button>
                    </div>
                </div> 
              </div>
            ) : (
              <div className="container">
                <div className="row"> 
                  <div className="col-md-3 text-light py-2 mt-2 custom-experience-preview-image text-center custom-upload-container">
                    <label htmlFor="image-input" className="btn btn-dark" >
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
                <div className="row d-flex justify-content-center">
                  <div className="col-md-2 py-2">
                    <button onClick={handleBackToPosts} className="btn btn-lg btn-secondary" >
                        <b>Cancel</b>
                    </button>
                  </div>
                  <div className="col-md-2 py-2">
                    <button onClick={handleSubmit} className="btn btn-success btn-lg" >
                        <b>Update</b>
                    </button>
                  </div>
                  <div className="col-md-2 py-2">
                    <button onClick={handleDelete} className="btn btn-lg btn-danger"  >
                        <b>Delete</b>
                    </button>
                  </div>
                </div>
              </div>
            )}                
            </form>
          </div>
        </div>
      ) : (
        // Mostrar las vistas de todas las publicaciones
          <div className="row">
            <h2 className="mt-5 mb-4 esmeralda">These have been some of the experiences of our users...</h2>
              {!showForm && (
              <div className="col-md-3 mx-auto my-5">
                <button onClick={handleShowForm} className="btn-success btn-lg mt-3">
                  { (experienceId === 'false' || !store.user_id) ? <b>"Share your experience"</b> : <b>"Update us"</b> }                                       
                </button>
              </div>
              )}   
            {store.experiences ? (
              <div className="container">
              <div className="card row fondo p-5">
                <Masonry
                          breakpointCols={breakpointColumnsObj}
                          className="my-masonry-grid"
                          columnClassName="my-masonry-grid_column"
                        >
                {store.experiences.map((experience) => (
                  <div className="col-sm-6 col-lg-4 mb-4" key={experience.id}>
                    <div className="card custom-card ">
                      <img
                        src={experience.photo}
                        alt={`Image for ${experience.title}`}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h4 className="card-title text-center">{experience.title}</h4>
                        <p className="card-text fs-5">{experience.body}</p>
                        <h5 className="card-text">Posted by: {experience.peopleName}</h5>
                      </div>
                    </div>
                  </div>
                ))}
                </Masonry>
              </div>
              </div> 
            ) : (
              <p>No experiences available.</p>
            )}
          </div>
      )}
    </div>
  );
};
