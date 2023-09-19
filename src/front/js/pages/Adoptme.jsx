import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
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



  useEffect(() => {
    actions.get_all_animals();
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjA2M2E0ZjdhYjg2OGM2ZmY1NWI2ODYwZjE2NTI1NjI1MGZlZThiMDQ0NTAwNDEwZDBhMjRmNmVmZDJkNDcwOTVlZWRkOThmODEyZWIxOTVlIiwiaWF0IjoxNjk1MDQ0MzgyLCJuYmYiOjE2OTUwNDQzODIsImV4cCI6MTY5NTA0Nzk4Miwic3ViIjoiIiwic2NvcGVzIjpbXX0.PEC0hLYY71UmK2D5t4SiNR6NyZgD5gzxYWH1THVoE3nS6hgGlbyKJ4abpGJUQUUTd8c7EjNbmImxASKU2Th_8tqo8DAIlVfKP-yDg_DAzDllDswOuMizfWAWMT2riNRF0a_uorC8g_kDf8Jf7K1cJBxlRdwZWqi9A-iXiCeyQXfzq39nEXDgbvEMDK-fdAdO196KMa0VIRl-ZGyfPYouaKgFikVnipnh_TK5FhLAevJSXWWAmZ0EALB7YBdLCOhZbsvLWbSWFayJFIo9jlrYgjvR_BU6impSzvCR5alYl2equsbFL4fIeztfPBIzlTfVhgMZ9J8TBqnkGkw25vECiw");

    // var requestOptions = {
    //   method: 'GET',
    //   mode: 'cors',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };


    // fetch("https://api.petfinder.com/v2/animals?type=dog&page=1", requestOptions)
    //   .then(response => response.json())
    //   .then(result => {
    //     setPets(result.animals);
    //     console.log(result)
    //   }
    //   )
    //   .catch(error => console.log('error', error));

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjA4MGM4ODI3NjIxNzZkY2M0YTVlZGRmYWJkODdjZjgzMGM1N2E2NzQ3YmZmOTBmZjIzNWZjY2Y1YjQ0M2Y3YWMyMzc1Yjg3YTZmZGU4MzI0IiwiaWF0IjoxNjk1MTMxMjM3LCJuYmYiOjE2OTUxMzEyMzcsImV4cCI6MTY5NTEzNDgzNywic3ViIjoiIiwic2NvcGVzIjpbXX0.dbDl2pZLgks54kY5sUkaI6nznnnNKbvmirWsq4muGR5gA9cSqYbpzb9WVwN28KU5J-EIzBlS3InddS2lWNkT2ZBzsdctWlavYfQdPV2dGUFMnvVCr29qID3Hl1cYyr5f0WThGlIvFleRwn2vHKddHeOfwTeB3gOpu6kMnvbXKJS4hFvii0fVYd0TV7RZCgj7eev6MtehXEs4AAQp-rvtYwYSbZ0uQmqJH4q_DaQVj8h4nhj1nXZ4BBSvWOOZhSYOAcgb8pdr22af4aDrUPv-jC7F415xZ8v0OaZRurIFaGhO1_m4Wc3jvijSQ9PHQZG0YxF5jfevLGFxuJKZFRlObg");

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

