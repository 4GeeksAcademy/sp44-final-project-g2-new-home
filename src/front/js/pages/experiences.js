import React, { useState, useContext, useEffect } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";
import Masonry from "react-masonry-css";


export const Experiences = () => {
  const { actions, store } = useContext(Context);
  // const [experiences, setExperiences] = useState([]); // Store published experiences
  const [title, setTitle] = useState(localStorage.getItem("experienceTitle"));
  const [body, setBody] = useState(localStorage.getItem("experienceBody"));
  const [photolist, setPhotolist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const[file, setFile]= useState("");
  const[fileUrl, setFileUrl]= useState(localStorage.getItem("experienceFileUrl"));
  const [likedExperiences, setLikedExperiences] = useState(new Set());

  const peopleId = store.peopleId; 
  const userId = store.user_id;
  const shelterId = localStorage.getItem("animalshelterId");

  const handleShowForm = () => {
    if (store.experienceId !== null) {
      const experienceToEdit = store.experiences.find((experience) => experience.id === store.experienceId);
      
      if (experienceToEdit) {
        localStorage.setItem("experienceTitle", experienceToEdit.title);
        localStorage.setItem("experienceBody", experienceToEdit.body);
        localStorage.setItem("experienceFileUrl", experienceToEdit.photo);
        
        setFileUrl(experienceToEdit.photo);
        setTitle(experienceToEdit.title);
        setBody(experienceToEdit.body);
        setIsEditing(true); // Activa el modo de edición si estás editando una experiencia existente
      } else {
        // Manejar el caso en el que no se encuentra la experiencia correspondiente
        console.error("Experience not found for ID:", store.experienceId);
      }
    } else {
      setShowForm(true); // Mostrar el formulario solo si el usuario está autenticado
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
  // if (!file) {
  //   alert("Please select a file.");
  //   return;
  // }

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
        actions.get_experiences();
      }
    } else {
      // Llama a la función de publicar si no hay experiencia ID
      const success = await actions.publishExperience(title, body, imageUrl, peopleId);
      if (success) {
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
      487:2,
      204:1
  };

  return (
    <div className="container">
      {showForm ? (
        // Mostrar el formulario
        <div className="container justify-content-center d-flex">
          <div className="">
            <div className="card row mt-5 fondo" >
              <h2 className="coloresmeralda text-center my-3">
                <b>{ store.experienceId !== null ? "Update your experience" : "Publish an experience"}</b>
              </h2>
              <div className="text-light p-3 mt-4 custom-preview-image text-center upload-container">
                <label htmlFor="image-input" className="upload-button p-2 rounded-3 center-button" >
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
              {fileUrl && (
                <div className="custom-preview-image upload-container">
                  <img src={fileUrl} alt="Preview" />
                </div>
              )} 
              <div className="input-fields">
                <form onSubmit={handleSubmit}>
                  <div className="row mt-5 d-flex justify-content-center">
                      <div className="col-md-6">
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={handleTitleChange}
                          className="form-control"
                        />
                      </div>
                      <div className="col-10">
                        <textarea
                          placeholder="Description"
                          value={body}
                          onChange={handleDescriptionChange}
                          className="form-control mt-3"
                        ></textarea>
                      </div>
                  </div>
                </form>
              </div>
              { store.experienceId !== null ? (
              <div className="row">
                <div className="col-12 py-3 d-flex justify-content-center">
                  <button onClick={handleBackToPosts} className="btn btn-transparent mt-2 ms-4 me-3" >
                      <i className="fas fa-arrow-left fa-2xl"></i>
                  </button>
               
                  <button onClick={handleSubmit} className="btn btn-transparent text-dark mt-2" >
                      <i className="fas fa-2xl fa-square-check" style={{color: "#27ca1c"}}></i>
                  </button>
                
                  <button onClick={handleDelete} className="btn btn-transparent mt-2 ms-3"  >
                      <i className="fas fa-trash-can fa-2xl" style={{color: "#585555"}}></i>
                  </button>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-12 py-3 d-flex justify-content-center">
                  <button onClick={handleBackToPosts} className="btn btn-transparent mt-2 ms-4 me-3" >
                      <i className="fas fa-arrow-left fa-2xl"></i>
                  </button>
                  <button onClick={handleSubmit} className="btn btn-transparent collapse-arrow text-dark mt-2 me-3">
                      <i className="far fa-paper-plane"></i>
                  </button>
                </div>
              </div> 
            )}
            </div>
          </div>
        </div>
      ) : (
        // Mostrar las vistas de todas las publicaciones
        <div className="row">
          <h2 className="mt-4 mb-4 esmeralda">These have been some of the experiences of our users...</h2>
          <div className="d-flex justify-content-center mb-5">
          {!showForm && (
        <button onClick={handleShowForm} className="btn btn-add-animal text-dark mt-3">
          { store.experienceId !== null ? <b>"Update us"</b>  : <b>"Share your experience with us"</b> }                                       
        </button>
         )}
         </div>
         <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
          {store.experiences ? (
            store.experiences.map((experience) => (
              <div className="col-md-4 mb-4" key={experience.id}>
                <div className="card custom-card">
                  {experience.photo ? (
                    <img
                      src={experience.photo}
                      alt={`Image for ${experience.title}`}
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
                    <h4 className="card-text">Posted by: {experience.peopleName}</h4>
                    <h5 className="card-title">{experience.title}</h5>
                    <p className="card-text">{experience.body}</p>
                  </div>
                </div>
              </div>
            ))
            
          ) : (
            <p>No experiences available.</p>
          )}
          </Masonry>
        </div>
      )}
    </div>
  );
};
