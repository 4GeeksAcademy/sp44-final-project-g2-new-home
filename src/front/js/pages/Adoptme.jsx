import React, { useState, useContext, useEffect } from "react";



export const Adoptme = () => {
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

  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6ImMwYTdkNjI5MGY4Y2JjZjdjMzQzZWU2MTZhM2IwMzIwYzI5NTMwMDIyNWExNGM2NTlmYzEzZTIyZGI1MDIyMjg0YTI3MTg0NjRkNDczYjVlIiwiaWF0IjoxNjk1MTE5MTU4LCJuYmYiOjE2OTUxMTkxNTgsImV4cCI6MTY5NTEyMjc1OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.PUUVm_z9bk0-_vzmt-nRB4Gvf13DjlJt_WRecBsY3xmcE2d3z62OvYlroOzipQO9YlcfMT8hZ9yZ9rWHiyUy-wPpOOCNzTi_7SKWvqJbXyOyjF5Zz87Z6KyZyzcuDsML_neQxnC_quT90YOOksCV8vMZd-wS64BWWZZXxOr6950-8vuFHHa8DMULzRBynJGQGNFKn-S7sL9-sNRHPpH1VnADXHTo4CTf5h7LNyDz4iHFGH6ys0VrSuVvdXYQB-9ZdWm8JnSQqgdamCGyHUUGr7itcnXIySNl2OPbo7ZgadjrnAt42uaWC2de6Sx7NqE2Vq5bIVSdH_SvfuVTQ1WkFw");

    var requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.petfinder.com/v2/animals?type=dog&page=1", requestOptions)
      .then(response => response.json())
      .then(result => {
        setPets(result.animals);
        console.log(result)
      }
      )
      .catch(error => console.log('error', error));
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente.

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
            {/* <img src={item.url || imgDefault} alt={item.name} onError={handleOnErrorImg} /> */}
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
    </div>
  )
}

// getCharacter: (character) => { setStore({ selectCharacter: character, })},
// 			