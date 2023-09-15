import React, { useState } from "react";
import "../../styles/experiences.css";

export const Experiences = () => {
  const [experiences, setExperiences] = useState([]); // Store published experiences
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
    setLikedExperiences(new Set(likedExperiences)); // Update to trigger a re-render
  };

  const handleSubmit = () => {
    // Basic validation: make sure a title and description are entered
    if (!title || !description) {
      alert("Please complete the title and description.");
      return;
    }

    // Create an experience object
    const newExperience = {
      id: Date.now(), // You can use a unique ID generation library
      title,
      description,
      image: image ? URL.createObjectURL(image) : null,
    };

    // Add the new experience to the array of experiences
    setExperiences([...experiences, newExperience]);

    // Reset the form
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="container">
      <div className="experiences-container">
        <div className="experience-post">
          <h2><b>Publish an Experience</b></h2>
          <div className="image-upload">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Selected Image" />
            ) : (
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}
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
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <button onClick={handleSubmit} id="post">Post</button>
        </div>
        <div className="experiences-feed">
          {experiences.map((experience) => (
            <div className="row-container">
              <div key={experience.id} className="experience">
                <div className="experience-image">
                  {experience.image && (
                    <img src={experience.image} alt="Experience Image" />
                  )}
                </div>
              </div>
              <br />
              <div className="experience-details">
                <div className="row">
                  <div className="col-md-1" id="col-1">
                    <div className="like-button-container">
                      <button onClick={() => handleLikeClick(experience.id)} className={`like-button ${likedExperiences.has(experience.id) ? "liked" : ""}`}>
                        <i className={`fas fa-heart ${likedExperiences.has(experience.id) ? "liked-icon" : ""}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-11" id="col-11">
                    <div className="title-container">
                      <h3>{experience.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="description-container">
                  <p>{experience.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
