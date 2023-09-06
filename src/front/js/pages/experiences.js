import React, { useState } from "react";
import "../../styles/experiences.css";

export const Experiences = () => {
  const [experiences, setExperiences] = useState([]); // Almacenar experiencias publicadas
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [likedExperiences, setLikedExperiences] = useState(new Set());

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleLikeClick = (id) => {
    if (likedExperiences.has(id)) {
      likedExperiences.delete(id);
    } else {
      likedExperiences.add(id);
    }
    setLikedExperiences(new Set(likedExperiences)); // Actualizar para desencadenar una renderización
  };

  const handleSubmit = () => {
    // Validación básica: asegurarse de que se haya ingresado un título y una descripción
    if (!title || !description) {
      alert("Por favor, complete el título y la descripción.");
      return;
    }

    // Crear un objeto experiencia
    const newExperience = {
      id: Date.now(), // Se puede usar una biblioteca de generación de IDs única
      title,
      description,
      image: image ? URL.createObjectURL(image) : null,
    };

    // Agregar la nueva experiencia al array de experiencias
    setExperiences([...experiences, newExperience]);

    // Restablecer el formulario
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="container">
      <div className="experiences-container">
      <div className="experience-post">
        <h2>Publicar una Experiencia</h2>
        <div className="image-upload">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Imagen seleccionada" />
          ) : (
            <label htmlFor="image-input">
              Arrastra y suelta una imagen o haz clic para seleccionar una.
            </label>
          )}
          <input
            type="file"
            id="image-input"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="input-fields">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button onClick={handleSubmit}>Publicar</button>
      </div>
      <div className="experiences-feed">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience">
              {experience.image && (
                <img src={experience.image} alt="Imagen de la experiencia" />
              )}
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <button
                onClick={() => handleLikeClick(experience.id)}
                className={`like-button ${
                  likedExperiences.has(experience.id) ? "liked" : ""
                }`}
              >
                <i
                  className={`fas fa-heart ${
                    likedExperiences.has(experience.id) ? "liked-icon" : ""
                  }`}
                ></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};