import React, { useState, useContext, useEffect } from "react";
import "../../styles/index.css";
import { Context } from "../store/appContext";
import Masonry from "react-masonry-css";
import { set } from "date-fns";


export const Experiences = () => {
  const { actions, store } = useContext(Context);
  // const [experiences, setExperiences] = useState([]); // Store published experiences
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);
  const[file, setFile]= useState("");
  const[fileUrl, setFileUrl]= useState("");
  const [imageChange, setImageChange] = useState(false);
  const[cloud, setCloud]= useState("");


  const peopleId = store.peopleId; 
  const userId = store.user_id;
  const shelterId = localStorage.getItem("animalshelterId");
  const experienceId = localStorage.getItem("experienceId")

  const handleShowForm = () => {
    if (peopleId) { 
      setShowForm(true);
      if (experienceId !== 'false' || !experienceId) {
        const localTitle = localStorage.getItem("experienceTitle");
        const localBody = localStorage.getItem("experienceBody");
        const localImg = localStorage.getItem("experienceimageUrl");
        setFileUrl(localImg || "");
        setTitle(localTitle || "");
        setBody(localBody || ""); 
    } 
    } else if (!userId) {
      alert("You need to log in to post your experience.");
    } else if (shelterId != null || (shelterId && peopleId === null)) {
      alert("You do not have permission to publish");
    }
  };
  
  
  
  
  const handleBackToPosts = () => {
    setShowForm(false); 
    if(experienceId !== 'false'){
      setFileUrl("");
      setTitle("");
      setBody("");
    }
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBody(e.target.value);
  };

  const handleImageChange = async (e) => {
    if (e.target.files.length) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFileUrl(imageUrl);
      setFile(e.target.files[0]);
  
      try {
        const form = new FormData();
        form.append("img", e.target.files[0]);
  
        const response = await fetch(process.env.BACKEND_URL + "/api/img", {
          method: "POST",
          body: form,
        });
  
        const data = await response.json();
        const cloudinaryUrl = await data["img_url: "];
  
        // Establece la URL de Cloudinary en el estado solo si se cargó una nueva imagen
        if (cloudinaryUrl) {
          setCloud(cloudinaryUrl);
          console.log("CLOUD:",cloudinaryUrl)
          setImageChange(true);
        }
      } catch (error) {
        console.error("Error al cargar la imagen en Cloudinary", error);
      }
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (experienceId === 'false') {
      if (!title || !body || !file) {
        alert("Please fill in all required fields (Title, Description, and Image).");
        return;
      }
    }
  
    if (experienceId === 'false' || !experienceId) {
      // Llama a la función de publicar si no hay experiencia ID
      const success = await actions.publishExperience(title, body, cloud, peopleId);
      if (success) {
        localStorage.setItem("experienceTitle", title);
        localStorage.setItem("experienceBody", body);
        localStorage.setItem("experienceimageUrl", cloud);
        setFileUrl(fileUrl);
        setTitle(title);
        setBody(body);
        actions.get_experiences();
      }
    } else {
      // Llama a la función de actualizar
      const id = store.experienceId;
  
      if (imageChange) {
        // Si se cargó una nueva imagen, actualiza con la nueva imagen
        const success = await actions.update_experience(id, title, body, cloud);
        if (success) {
          localStorage.setItem("experienceTitle", title);
          localStorage.setItem("experienceBody", body);
          localStorage.setItem("experienceFileUrl", cloud);
          setFileUrl(cloud);
          setTitle(title);
          setBody(body);
          setImageChange(false);
          actions.get_experiences();
        }
      } else {
        // Si no se cargó una nueva imagen, actualiza con la imagen existente
        const success = await actions.update_experience(id, title, body, fileUrl);
        if (success) {
          localStorage.setItem("experienceTitle", title);
          localStorage.setItem("experienceBody", body);
          setFileUrl(fileUrl);
          setTitle(title);
          setBody(body);
          actions.get_experiences();
        }
      }
    }
  
    setShowForm(false);
  };
  

  const handleDelete = async () => {

    const success = await actions.deleteExperience(store.experienceId);
      if (success.success) {
        console.log("Experiencie Deleted")
        setShowForm(false); 
        setTitle("");
        setBody("");
        setFileUrl("");
        setCloud("");
        localStorage.removeItem("experienceId");
        localStorage.removeItem("experienceTitle");
        localStorage.removeItem("experienceBody");
        localStorage.removeItem("experienceFileUrl");
        localStorage.removeItem("experienceimageUrl");
        actions.get_experiences();
      } else {
        alert("Failed to delete the experience. Please try again later.");
      }
    
  };

  useEffect(() => {
    actions.get_experiences();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    470: 2,
    380: 1
  };

  

  return (
    <div className="container">
      {showForm ? (
        // Mostrar el formulario
        <div className="card fondo mt-5 text-center mx-auto" style={{maxWidth: "60%"}}>
          <div className="card-body">
              <h2 className="card-title coloresmeralda text-center my-3">
                <b>{( experienceId == 'false' || !experienceId) ? "Publish an experience" : "Update your experience"}</b>
              </h2>
              
              {fileUrl && (
                <div className="custom-experience-preview-image custom-upload-container">
                  <img src={(fileUrl)} alt="Preview" />
                </div>
              )} 
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="row mt-5"> 
                    <div className="col-1" style={{maxWidth: "9%"}}></div>
                    <div className="col-md-3 text-light text-start">
                      <label className="form-label  text-dark "><b>Photo:</b></label>
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
                  <div className="row  d-flex text-start justify-content-center">
                      <div className="col-md-10">
                        <label className="form-label"><b>Title:</b></label>
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={handleTitleChange}
                          className="form-control mt-3"
                          id="title"
                        />
                      </div>
                      <div className="col-md-10 mt-3 mb-3">
                        <label className="form-label"><b>Description:</b></label>
                        <textarea
                          placeholder="Description"
                          value={body}
                          onChange={handleDescriptionChange}
                          className="form-control mt-3"
                          id="description"
                        ></textarea>
                      </div>
                  </div>
              { (experienceId === 'false'  || !experienceId) ? (
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                      <button onClick={handleBackToPosts} className="btn btn-lg btn-secondary mx-2" >
                          <b>Cancel</b>
                      </button>
                      <button onClick={handleSubmit} className="btn btn-lg btn-success mx-2">
                          <b>Send</b>
                      </button>
                    </div>
                </div> 
            ) : (
                <div className="row d-flex justify-content-center">
                  <div className="col-md-2 mx-4 py-2">
                    <button onClick={handleBackToPosts} className="btn btn-lg btn-secondary" >
                        <b>Cancel</b>
                    </button>
                  </div>
                  <div className="col-md-2 mx-4 py-2">
                    <button onClick={handleSubmit} className="btn btn-success btn-lg" >
                        <b>Update</b>
                    </button>
                  </div>
                  <div className="col-md-2 mx-4 py-2">
                    <button onClick={handleDelete} className="btn btn-lg btn-danger"  >
                        <b>Delete</b>
                    </button>
                  </div>
                </div>
            )}                
            </form>
          </div>
        </div>
      ) : (
        // Mostrar las vistas de todas las publicaciones
          <div className="row">
            <h2 className="mt-5 mb-4 esmeralda text-center">These have been some of the experiences of our users...</h2>
              {!showForm && (
              <div className="col-md-3 mx-auto my-5">
                <button onClick={handleShowForm} className="btn-success btn-lg mt-3">
                  { (experienceId === 'false' || !store.user_id || !experienceId) ? <b>Share your experience</b> : <b>Update us</b> }                                                       </button>
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
