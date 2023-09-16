import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import imgDefault from "../../img/404.png";
import { Imagen1 } from "../../img/imgError/1.jpg";
import { Imagen2 } from "../../img/imgError/2.jpg";
import { Imagen3 } from "../../img/imgError/3.jpg";
import { Imagen4 } from "../../img/imgError/4.jpg";
import { Imagen5 } from "../../img/imgError/5.jpg";
import { Imagen6 } from "../../img/imgError/6.jpg";
import { Imagen7 } from "../../img/imgError/7.jpg";
import { Imagen8 } from "../../img/imgError/8.jpg";
import { Imagen9 } from "../../img/imgError/9.jpg";
import { Imagen10 } from "../../img/imgError/10.jpg";
import { Imagen11 } from "../../img/imgError/11.jpg";
import { Imagen12 } from "../../img/imgError/12.jpg";
import { Imagen13 } from "../../img/imgError/13.jpg";
import { Imagen14 } from "../../img/imgError/14.jpg";
import { Imagen15 } from "../../img/imgError/15.jpg";
import { Imagen16 } from "../../img/imgError/16.jpg";
import { Imagen17 } from "../../img/imgError/17.jpg";
import { Imagen18 } from "../../img/imgError/18.jpg";
import { Imagen19 } from "../../img/imgError/19.jpg";
import { Imagen20 } from "../../img/imgError/20.jpg";



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
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjdhM2QxZjZjM2VmYTVhYjVjNDkwNDEyZDVjM2Y5YTJlY2E0Y2NkNzdhZDgwZjEzZDBkN2Y3ZDRkYTY0YWJjNWU4ZDczZDhiMWNjMDVjNjViIiwiaWF0IjoxNjk0ODAzODAwLCJuYmYiOjE2OTQ4MDM4MDAsImV4cCI6MTY5NDgwNzQwMCwic3ViIjoiIiwic2NvcGVzIjpbXX0.o6SvBpAj7gslxNm98KZQ296T9SV-IwIfQ4xrOrgtwVMOBPswZ2dV6T8tUZcWau1XjWTa4bkQWF0Bt4iuzDsIYZ-9stbjNdPR4F7fckRm3Nl-j_kQgfx2L3Pg2_7QFh-tooe69wPJ2nfLSXrsiq22Hgvjy8p9ZTyG7SYDjyNSyHZfmnxZK5xk8_VAbXv-LJLRsCqoPi95PSdqNY5Qmyma6OYKcNbbeAbE90qhQzz4BGHNvpaVL-gZOa0VtLuJJHcGfhlu4UrO73SJCy1N4K8OyO7xNyed2S7bGdhRw9ZP36uXcnRXMHpU9oljRYVQZMs3jaHUFR2FTxwzVaktgth3Lg");

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
              <div className="d-flex justify-content-between">
              {/* <Link to={`/characters/${id}`} className="btn btn-secondary"
                      onClick={() => actions.getCharacter({ id, urlImage, item })}>
                        Details
                    </Link> */}
              <Link to={`/adoptme/${id}`}>
                  <span className="navbar-brand mb-0 h1 btn btn-outline-secondary me-2">Details</span>
              </Link>
                <div className="text-end">
                  <button className="btn btn-danger">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// getCharacter: (character) => { setStore({ selectCharacter: character, })},
// 			