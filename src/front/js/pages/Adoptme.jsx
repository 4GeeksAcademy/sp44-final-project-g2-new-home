import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";



export const Adoptme = () => {

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


  return (

  <div className="container bg-danger mb-3">
      <h1 className="text-light text-center pt-4">PLEASE ADOPT ME!!!!!</h1>
      <div className="d-flex flex-wrap justify-content-between">
        {pets.map((item, id) => (
          <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
            <img src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${item.id}/1/`} onError={handleOnErrorImg} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p><strong>Breed mixture: </strong>{item.breeds.primary}</p> 
              <p><strong>Age: </strong>{item.age}</p>
              <p><strong>Gender: </strong>{item.gender}</p>
              <p><strong>Size: </strong>{item.size}</p>
              <p><strong>Descriptions: </strong>{item.description}</p>
              <p><strong>City: </strong>{item.city}</p>
              <p><strong>Contact: </strong>{item.contact.phone}</p>
            </div>
            
          </div>
        ))}
      </div>
      <div className="d-flex flex-wrap justify-content-between">
        { store.animals ? (
        store.animals.map((animal) => (
          <div className="card m-3 rounded" key={animal.id} style={{ width: "23rem" }}>
            <img
              src={animal.photo}
              alt={`Image for ${animal.name}`}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{animal.name}</h5>
              <p><strong>City: </strong>{animal.city}</p> 
              <p><strong>Animal Status: </strong>{animal.animal_status}</p>
              <p><strong>Color: </strong>{animal.color}</p>
              <p><strong>Size: </strong>{animal.size}</p>
              <p><strong>Descriptions: </strong>{animal.description}</p>
              <p><strong>City: </strong>{animal.contact}</p>
              <p><strong>Contact: </strong>{animal.phone}</p>
            </div>
          </div>
        ))
        ) : null}
      </div>
  </div>
  )
}




// getCharacter: (character) => { setStore({ selectCharacter: character, })},
// 			

