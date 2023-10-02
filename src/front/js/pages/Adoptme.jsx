import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


export const Adoptme = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  const [pets, setPets] = useState([]);
  const hostPetfinder = 'https://api.petfinder.com/v2/';
  const url = hostPetfinder + 'animal?type=dog&page=1';
  const backupImages = [
      require("../../img/imgError/1.jpg"),
      require("../../img/imgError/2.jpg"),
      require("../../img/imgError/3.jpg"),
      require("../../img/imgError/4.jpg"),
      require("../../img/imgError/5.jpg"),
      require("../../img/imgError/6.jpg"),
      require("../../img/imgError/7.jpg"),
      require("../../img/imgError/8.jpg"),
      require("../../img/imgError/9.jpg"),
      require("../../img/imgError/10.jpg"),
      require("../../img/imgError/11.jpg"),
      require("../../img/imgError/12.jpg"),
      require("../../img/imgError/13.jpg"),
      require("../../img/imgError/14.jpg"),
      require("../../img/imgError/15.jpg"),
      require("../../img/imgError/16.jpg"),
      require("../../img/imgError/17.jpg"),
      require("../../img/imgError/18.jpg"),
      require("../../img/imgError/19.jpg"),
      require("../../img/imgError/20.jpg")
  ]
  const [backupImageIndex, setBackupImageIndex] = useState(0);

  const getAnimal = async (token) => {
    const url ='https://api.petfinder.com/v2/animals?type=dog&page=1';
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {Authorization: `Bearer ${token}`},
      redirect: 'follow'
    };
    const response = await fetch(url, requestOptions);
    if(response.ok) {
      const data = await response.json();
      console.log(data);
      setPets(data.animals);
    } else {
        console.log('error', response.status, response.statusText);
    }
    }
  
  useEffect(() => {
      actions.get_all_animals();
      actions.fetchToken().then(token => {
        if (token) {
          console.log(token);
          getAnimal(token)
        }
      });
    }, []);

  const handleOnErrorImg = (e) => {
    const newBackupIndex = (backupImageIndex + 1) % backupImages.length;
    setBackupImageIndex(newBackupIndex);
    e.target.src = backupImages[newBackupIndex].default; // Usa .default para obtener la ruta de la imagen importada
  };


  const breakpointColumnsObj = {
    default: 3,
    485:2,
    320:1
  };
  
  
  return (
    <div className="container mb-3">
      <h1 className="esmeralda text-center mt-5 mb-5">Adopt a pet</h1>
      <div className="card row fondo p-3 py-5">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
          {pets ? (
            pets.slice(0, 18).map((animal, id) => (
              <div key={id} className="card custom-card rounded col-12 col-md-6 col-lg-4">
                <img
                  src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${animal.id}/1/`}
                  onError={handleOnErrorImg}
                  alt={`Image for ${animal.name}`}
                  className="card-img-top card-v"
                />
                <div className="card-body">
                  <h5 className="card-title">{animal.name}</h5>
                  <p><strong>Breed mixture: </strong>{animal.breeds ? animal.breeds.primary : 'N/A'}</p> 
                  <p><strong>Age: </strong>{animal.age ? animal.age : 'N/A'}</p>
                  <p><strong>Gender: </strong>{animal.gender ? animal.gender : 'N/A'}</p>
                  <p><strong>Size: </strong>{animal.size ? animal.size : 'N/A'}</p>
                  <p><strong>Descriptions: </strong>{animal.description ? animal.description : 'N/A'}</p>
                  <p><strong>City: </strong>{animal.city ? animal.city : 'N/A'}</p>
                  <p><strong>Contact: </strong>{animal.contact && animal.contact.phone ? animal.contact.phone : 'N/A'}</p>
                </div>
                <div className="d-flex justify-content-center">
                <Link to="/details" state = {animal} className="btn btn-info text-light mb-2" ><b>More details</b></Link>
                </div>
              </div> 
            ))
          ) : null}
        {store.animals ? (
          store.animals.map((animal, index) => (
            <div key={animal.id} className="card custom-card rounded col-12 col-md-6 col-lg-4">
              <img
                src={animal.photo || backupImages[backupImageIndex].default}
                alt={`Image for ${animal.name}`}
                className="card-img-top card-v"
              />
              <div className="card-body">
                <h5 className="card-title">{animal.name}</h5>
                <p><strong>City: </strong>{animal.city ? animal.city : 'N/A'}</p> 
                <p><strong>Animal Status: </strong>{animal.animal_status ? animal.animal_status : 'N/A'}</p>
                <p><strong>Color: </strong>{animal.color ? animal.color : 'N/A'}</p>
                <p><strong>Size: </strong>{animal.size ? animal.size : 'N/A'}</p>
                <p><strong>Descriptions: </strong>{animal.description ? animal.description : 'N/A'}</p>
                <p><strong>Contact: </strong>{animal.contact ? animal.contact : 'N/A'}</p>
                <p><strong>Phone: </strong>{animal.phone ? animal.phone : 'N/A'}</p>
              </div>
            </div>
          ))
        ) : null}
      </Masonry>
     </div>
    </div>
  );  
}