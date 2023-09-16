import React, { useState, useContext, useEffect } from "react";
import "../../styles/experiences.css";
import { Context } from "../store/appContext";


export const Experiences = () => {
  const { actions, store } = useContext(Context);
  const [experiences, setExperiences] = useState([]); // Store published experiences
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photolist, setPhotolist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const[file, setFile]= useState("");
  const[fileUrl, setFileUrl]= useState("");

  


  const [likedExperiences, setLikedExperiences] = useState(new Set());

  const peopleId = store.user_id; 

  const handleShowForm = () => {
    if (peopleId) {
      setShowForm(true); // Mostrar el formulario solo si el usuario está autenticado
    } else {
      // Mostrar un alert si el usuario no está autenticado
      alert("You need to log in to post your experience.");
    }
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
    
    
    // if (file) {
    //   // Crear una URL para el archivo seleccionado
    //   const fileURL = URL.createObjectURL(file);

    //   // Agregar el archivo a la lista de fotos solo si no se excede el límite
    //   if (photolist.length < 5) {
    //     setPhotolist([...photolist, fileURL]);
    //   }
    // }
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
  if (!file) {
    alert("Please select a file.");
    return;
  }

  try {
    const form = new FormData();
    form.append("img", file);

    const response = await fetch("https://studious-engine-vxqg75jjggw2xjvw-3001.app.github.dev/api/img", {
      method: "POST",
      body: form
    });

    const data = await response.json();
    const imageUrl = data["img_url: "];

    console.log("data fetch img: ", data);
    console.log("imageUUUUUUUUURL: ", imageUrl)

    if (store.experienceId) {
      // Llama a la función de actualizar
      const success = await actions.update_experience(store.experienceId, title, body, imageUrl);
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

    // const success = await actions.publishExperience(title, body, imageUrl, peopleId); // Pasa imageUrl en lugar de photolist
    // if (success) {
    //   actions.get_experiences();
    // }

    setShowForm(false);
    setTitle("");
    setBody("");
    setPhotolist([]);
    setFileUrl(""); // Limpia la URL de la imagen después de usarla
  } catch (e) {
    console.error("ERROR IMAGEN", e);
  }
};
  useEffect(() => {
    actions.get_experiences();
  }, []);
  // {store.experiences ? (
  //   store.experiences.forEach((experience) => {
  //     // Agrega un console.log para verificar la URL de la imagen
  //     console.log("experience.imagen:", experience.image);
  //   })
  // ) : (
  //   <p>No hay experiencias disponibles.</p>
  // )}
  return (
    <div className="container">
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
              <button className="me-3"  style={{ width: '80px' }} onClick={handleBackToPosts} id="post">
                Cancel
              </button>
              <button onClick={handleSubmit} style={{ width: '80px' }} id="post">
                {store.experienceId ? "Update" : "Post"}
              </button>
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
                    <h4 className="card-text">Posted by: {experience.name}</h4>
                    <h5 className="card-title">{experience.title}</h5>
                    <p className="card-text">{experience.body}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay experiencias disponibles.</p>
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
