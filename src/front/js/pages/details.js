import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Masonry from "react-masonry-css";
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';


export const Details = () => {
  let { state } = useLocation();
  console.log(state)
  const [pet, setPet] = useState(state);
  console.log(state)

  if (!state) {
    return <div>No data available</div>;
  }

  const { contact, name, breeds, size, age, colors, attributes, tags, url, photos, environment } = state;

  return (
    <div className="container mb-4">
      <Row>
      <Col xs={6}>
    <Card className="h-100 d-flex flex-column justify-content-between w-75 mx-auto" style={{ width: "100%" }}>
      <Card.Img
      variant="top"
        src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${pet.id}/1/`}
        alt={`Image for ${pet.name}`}
        style={{ objectFit: "cover" }}
      />
      </Card>
      </Col>
      <Col xs={6}>
      <Card className="h-100 d-flex flex-column justify-content-between w-75 mx-auto" style={{ width: "100%" }}>
      <Card.Body>
        <h3 className="card-title d-flex justify-content-center mb-5">{name}</h3>
        <p className="card-text fs-4"><strong >Breed mixture: </strong>{pet.breeds ? pet.breeds.primary : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Age: </strong>{pet.age ? pet.age : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Gender: </strong>{pet.gender ? pet.gender : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Size: </strong>{pet.size ? pet.size : 'N/A'}</p>
          <p className="card-text fs-4"><strong>Descriptions: </strong>{pet.description ? pet.description : 'N/A'}</p>
          <p className="card-text fs-4"><strong>City: </strong>{pet.city ? pet.city : 'N/A'}</p>
          <p className="card-text fs-4 mb-4"><strong>Contact: </strong>{pet.contact && pet.contact.phone ? pet.contact.phone : 'N/A'}</p>
      </Card.Body>
      </Card>
      </Col>
      </Row>
    </div>
  );
};


