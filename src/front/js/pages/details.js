import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export const Details = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  console.log(state)
  const [pet, setPet] = useState(state);
  console.log(state)

  if (!state) {
    return <div>No data available</div>;
  }

  const { contact, name, breeds, size, age, colors, attributes, tags, url, photos, environment } = state;

  const handleClick = ()=>{
    navigate("/adoptme");
  }

  return (
    <div className="container mb-4">
      <div className="card row d-flex fondo p-3 py-5">
      <div className="col-md-6 ">
      <img
        className="card-img-top"
        src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${pet.id}/1/`}
        alt={`Image for ${pet.name}`}
        style={{ objectFit: "cover" }}
      />
      </div>
      <div className="col-md-6">
      <div className="card-body">
        <h3 className="card-title mb-5">{name}</h3>
        <p className="card-text fs-4"><strong >Breed mixture: </strong>{pet.breeds ? pet.breeds.primary : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Age: </strong>{pet.age ? pet.age : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Gender: </strong>{pet.gender ? pet.gender : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Size: </strong>{pet.size ? pet.size : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Descriptions: </strong>{pet.description ? pet.description : 'N/A'}</p>
          <p className="card-text fs-4"><strong>City: </strong>{pet.city ? pet.city : 'N/A'}</p>
          <p className="card-text fs-4 mb-4"><strong>Contact: </strong>{pet.contact && pet.contact.phone ? pet.contact.phone : 'N/A'}</p>
      </div>
      </div>          
      <button className="btn btn-secondary btn-lg" onClick={handleClick}><b>Back</b></button>

      </div>
    </div>
  );
};
