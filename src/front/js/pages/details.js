import React, { useEffect, useState } from "react";

export const Details = ({ pet }) => {
    if (!pet) {
      return <div>No pet selected</div>;
    }
  
    return (
      <div className="card m-3 rounded col-12 col-md-6 col-lg-4" style={{ width: "30%" }}>
        <img
          src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${pet.id}/1/`}
          alt={`Image for ${pet.name}`}
          style={{ width: "100%", height: "30%", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
          <p><strong>Breed mixture: </strong>{pet.breeds ? pet.breeds.primary : 'N/A'}</p>
          <p><strong>Age: </strong>{pet.age ? pet.age : 'N/A'}</p>
          <p><strong>Gender: </strong>{pet.gender ? pet.gender : 'N/A'}</p>
          <p><strong>Size: </strong>{pet.size ? pet.size : 'N/A'}</p>
          <p><strong>Descriptions: </strong>{pet.description ? pet.description : 'N/A'}</p>
          <p><strong>City: </strong>{pet.city ? pet.city : 'N/A'}</p>
          <p><strong>Contact: </strong>{pet.contact && pet.contact.phone ? pet.contact.phone : 'N/A'}</p>
        </div>
      </div>
    );
  };

 
