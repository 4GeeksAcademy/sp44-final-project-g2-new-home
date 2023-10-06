import React, { useState} from "react";
import { Link, useLocation } from "react-router-dom";


export const Detailsdb = () => {
  let { state } = useLocation();
  console.log(state)
  const [pet, setPet] = useState(state);
  console.log(state)

  if (!state) {
    return <div>No data available</div>;
  }

  const { contact, name, breeds, size, age, colors, attributes, tags, url, photos, environment } = state;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card fondo mb-3" style={{maxWidth: "900px"}}>
        <div class="row g-0">
          <div className="col-md-7">
            <img
              variant="top"
              src={pet.photo || backupImages[backupImageIndex].default}
              alt={`Image for ${pet.name}`}
              className="img-fluid"
            />
          </div>
            <div className="col-md-5 ps-4">
                <div className="card-body">
                  <h3 className="card-title d-flex justify-content-center mb-5">{name}</h3>
                  <p className="card-text fs-4"><strong >Breed mixture: </strong>{pet.mixture ? pet.mixture : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>Age: </strong>{pet.age ? pet.age : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>Gender: </strong>{pet.gender ? pet.gender : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>Size: </strong>{pet.size ? pet.size : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>Descriptions: </strong>{pet.description ? pet.description : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>City: </strong>{pet.city ? pet.city : 'N/A'}</p>
                  <p className="card-text fs-4"><strong>Phone: </strong>{pet.phone ? pet.phone : 'N/A'}</p>
                  <p className="card-text fs-4 mb-4"><strong>Contact: </strong>{pet.contact && pet.contact ? pet.contact : 'N/A'}</p>
                  <div className="mt-2 d-flex justify-content-center mb-2">
                    <Link to="/adoptme" className="btn btn-secondary btn-lg"><strong>Pet list</strong></Link>
                  </div>
                </div>  
          </div>
        </div>  
      </div>
    </div>
  );
};
