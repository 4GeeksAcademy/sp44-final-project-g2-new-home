import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import imgDefault from "../../img/404.png";
// import axios from 'axios';
// import cheerio from 'cheerio';


export const DetailsPets = () => {
  const [petsDetails, setPetsDetails] = useState([null]);
  const { id } = useParams();
  const apiKey = '43K0NJRKxBRfIqPDpHt9buA50H6NpDkiZEw5yyEnsPo5nQv2ri';
  const apiSecret = 'jswVOs8TwvJn9QUnMY8Ukad0xmrrr3A4rqrtkkUF';
  const hostPetfinder = 'https://api.petfinder.com/v2/animals/';
  const url = `${hostPetfinder}${id}`;

  // const getDetailsPets = async () => {
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   return data
  // }

  useEffect(() => {

    // getDetailsPets().then(data => setPetsDetails(data.animals.id))
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjFjODJlYTUyN2VmMjQ1YjVmYWQ5ZjhlN2FjZmUxMzI5ZDYwYTRhODA2ZWRkMTA0MDE3OGZkZmQzODI0YmRjYWY5NzcwZjY5MzVlZDcxOTAyIiwiaWF0IjoxNjk0NTE1Nzc3LCJuYmYiOjE2OTQ1MTU3NzcsImV4cCI6MTY5NDUxOTM3Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.jOy4sEbbCK_AwaaNxLiuGGAMQrAhjTeWN1Ja0Au0KOcqlFsBHwVIT9Tw7feYgMKSSQG7dFwLk7N2KL5fHFvsRqGudvyfjw86SHhMmMquMZsC66e7vE0dwiH9-1F-C8iOmE-Yj19sgHub3c0MQixN3AHPeiqo3OIWjxR5lhBKv29sCzwZcJvUSuZXdnf6r9zKzcCM9_tKEmtj8qQ7PGQTGNqsCAA723hQsSaTfXA4btPT7qN8LRPqbN_AyLNno-_OG3jErrTSzS2EvMOm3hwNm2EDghpKLyIaOVTmsIqqVPVS6UpNWWAwGxq4A_Uu-FHNElLV3xa5HyeeXiIdvFnY0A");

var requestOptions = {
  method: 'GET',
  mode: 'cors',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    if (data.animal) {
      setPetsDetails(data.animal);
    } else {
      // Si no se encuentra un animal con ese ID, puedes manejar el caso aquí.
      console.log('Animal no encontrado');
    }
  })
  .catch(error => console.log('error', error));
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente.

  const handleOnErrorImg = (e) => { e.target.src = imgDefault }


  return (
    <>
    {
      petsDetails !== null && (
      <div className="container bg-danger mb-3">
        <h1 className="text-light text-center pt-4">PLEASE ADOPT ME!!!!!</h1>
        <div className="d-flex flex-wrap justify-content-between">
        
            <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
              {/* <img src={item.url || imgDefault} alt={item.name} onError={handleOnErrorImg} /> */}
              {/* <img src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${id}/1/`} onError={handleOnErrorImg} /> */}
              <div className="card-body">
                <h5 className="card-title">{petsDetails.name}</h5>
                <div className="d-flex justify-content-between">
                  <div className="text-end">
                    <button className="btn btn-danger">
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
         
        </div>
        </div>
        )
        }
      </>
    )
}