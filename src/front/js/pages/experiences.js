import React, { useState, useContext, useEffect } from "react";
import "../../styles/experiences.css";
import { Context } from "../store/appContext";


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
    if (peopleId) {
      setShowForm(true); // Mostrar el formulario solo si el usuario está autenticado
    } else if (!userId) {
      alert("You need to log in to post your experience.");
    } else if (shelterId != null || (shelterId && peopleId === null)) {
      alert("You do not have permission to publish");
    }
      
      const experienceToEdit = store.experiences.find((experience) => experience.id === store.experienceId);
      localStorage.setItem("experienceTitle", experienceToEdit.title);
      localStorage.setItem("experienceBody", experienceToEdit.body);
      localStorage.setItem("experienceFileUrl", experienceToEdit.photo);
      
      setFileUrl(experienceToEdit.photo);
      setTitle(experienceToEdit.title );
      setBody(experienceToEdit.body );
      ; 
  };
  
  
  const handleBackToPosts = () => {
    setShowForm(false); // Volver a las vistas de todas las publicaciones
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length){
      setFile(e.target.files[0]);
      console.log("evento imagen: ", e.target.files);
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
  }, []);



  return (
   
    <div className="container contenido">
      {showForm ? (
        // Mostrar el formulario
        <div className="container">
          <div className="experiences-container">
            <div className="experience-post">
              <h2>
                <b>{store.experienceId ? "Update" : "Publish"} an Experience</b>
              </h2>
              <div className="image-upload">
                  <input
                    type="file"
                    id="image-input"
                    accept="image/jpeg"
                    // multiple
                    onChange={handleImageChange}
                  />
              </div>
              <div className="input-fields">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
                <textarea
                  placeholder="Description"
                  value={body}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              {store.experienceId ? (
              <div>
                <button onClick={handleBackToPosts} className="me-3"  style={{ width: "80px" }} id="post">
                  Cancel
                </button>
                <button onClick={handleDelete} className="me-3 mb-5"  style={{ width: "80px" }} id="post">
                  Delete
                </button>
                <button onClick={handleSubmit} style={{ width: "80px" }} id="post">
                  Update
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleBackToPosts} className="me-3"  style={{ width: "80px" }} id="post">
                  Cancel
                </button>
                <button onClick={handleSubmit} style={{ width: "80px" }} id="post">
                  Post
                </button>
              </div>
            )}
              { 
                fileUrl !== ""  ? <img src={fileUrl} className="img-fluid"/> : null
              }
            </div>
          </div>
        </div>
      ) : (
        // Mostrar las vistas de todas las publicaciones
        <div className="row">
          <h2 className="mt-4 mb-4">These have been some of the experiences of our users...</h2>
          {store.experiences ? (
            store.experiences.map((experience) => (
              <div className="col-md-4 mb-4" key={experience.id}>
                <div className="card">
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
        </div>
      )}
      
      {!showForm && (
        <button onClick={handleShowForm} className="btn btn-primary">
          {store.experienceId ? "Update us" : "Share your experience with us"}                                       
        </button>
      )}
    </div>
    
  );
};
