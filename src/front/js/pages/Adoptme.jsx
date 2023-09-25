import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/adotme.css";
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

  const handleClick = (pet)=>{
    navigate("/details");
  }
  
  
return(
  <div className="container mb-3">
  <h1 className="text-success text-center pt-4">Adopt a pet</h1>

  <div className="row bg-primary-subtle rounded-5">
  {pets.slice(0, 18).map((item, id) => (
      <div key={id} className="card  m-3 rounded col-12 col-md-6 col-lg-4" style={{ width: "30%" }}>
        <img
          src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${item.id}/1/`}
          onError={handleOnErrorImg}
          alt={`Image for ${item.name}`}
          className="card-img-top card-v"
          // style={{ width: "100%", height: "30%", objectFit: "contain" }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p><strong>Breed mixture: </strong>{item.breeds ? item.breeds.primary : 'N/A'}</p> 
          <p><strong>Age: </strong>{item.age ? item.age : 'N/A'}</p>
          <p><strong>Gender: </strong>{item.gender ? item.gender : 'N/A'}</p>
          <p><strong>Size: </strong>{item.size ? item.size : 'N/A'}</p>
          <p><strong>Descriptions: </strong>{item.description ? item.description : 'N/A'}</p>
          <p><strong>City: </strong>{item.city ? item.city : 'N/A'}</p>
          <p><strong>Contact: </strong>{item.contact && item.contact.phone ? item.contact.phone : 'N/A'}</p>
        
        </div> <button onClick={handleClick}>Details</button>
      </div> 
    ))}
  </div>

  <Masonry
    breakpointCols={{ default: 3, 100: 1, 2500: 1 }}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    <div className="row">
      {store.animals ? (
        store.animals.map((animal, index) => (
          <div key={animal.id} className="card m-3 rounded col-12 col-md-6 col-lg-4" style={{ width: "30%"}}>
            <img
              src={animal.photo || backupImages[backupImageIndex].default}
              alt={`Image for ${animal.name}`}
              className="card-img-top card-v"
              style={{ }}

            />
            <div className="card-body">
              <h5 className="card-title">{animal.name}</h5>
              <p><strong>City: </strong>{animal.city ? animal.city : 'N/A'}</p> 
              <p><strong>Animal Status: </strong>{animal.animal_status ? animal.animal_status : 'N/A'}</p>
              <p><strong>Color: </strong>{animal.color ? animal.color : 'N/A'}</p>
              <p><strong>Size: </strong>{animal.size ? animal.size : 'N/A'}</p>
              <p><strong>Descriptions: </strong>{animal.description ? animal.description : 'N/A'}</p>
              <p><strong>City: </strong>{animal.contact ? animal.contact : 'N/A'}</p>
              <p><strong>Contact: </strong>{animal.phone ? animal.phone : 'N/A'}</p>
              {/* Resto de la información de la tarjeta */}
            </div>
          </div>
        ))
      ) : null}
    </div>
  </Masonry>
</div>
) 
}