import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import imgDefault from "../../img/404.png";
// import axios from 'axios';
// import cheerio from 'cheerio';


export const Adoptme = () => {
  const [pets, setPets] = useState([]);
  // const { store, actions } = useContext(Context);
  const apiKey = '43K0NJRKxBRfIqPDpHt9buA50H6NpDkiZEw5yyEnsPo5nQv2ri';
  const apiSecret = 'jswVOs8TwvJn9QUnMY8Ukad0xmrrr3A4rqrtkkUF';
  const hostPetfinder = 'https://api.petfinder.com/v2/';
  const url = hostPetfinder + 'animal?type=dog&page=1';
  // const [imagenUrl, setImagenUrl] = useState('');
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6ImNlNjE0MzFiOTFhMzI0YzA2ZTYzNDU2NjA4ODE1ZDJhZTFjMjU4NTZhMmFiMzljNDliMzVjODJhMjk4NjQwOGMzN2UxZmJiYzM3N2ExZjBjIiwiaWF0IjoxNjk0NDU1NTcxLCJuYmYiOjE2OTQ0NTU1NzEsImV4cCI6MTY5NDQ1OTE3MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.oy0eVa44TIy99vXyUTINXtS9SOzKbJtUqjHo5YzNoFurp2CPNCo0UonXo6DGi9MxYIIZKD8-lvvGI-HoA29slDWSw--lEXM5HTEaNVo_Lf2QrSAoti4lyrhqRFrMgKSfyvu_q_BnUaaOxaqS0_3h0uBJqfnDgtxm8KITm1QQk5Jvr3TXzzqGnpL7ufuD0vQapgxkX9WGaTiO1VtjZyVFOy6ZiNwg0bZHctRg56ByL63En61etE_NWCUXxKoaTVzL0CfqR2lnjetvgf3gyPGjhTOF9CIrYX1go9EIy5LT-T8nXMzp8CYeQXkgpRbh2c8FdgvvR6WRBaxh6Fz_hy2Qww'

  useEffect(() => {
    // const params = new URLSearchParams({
    //   type: 'dog',
    //   limit: 10
    // });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjFjODJlYTUyN2VmMjQ1YjVmYWQ5ZjhlN2FjZmUxMzI5ZDYwYTRhODA2ZWRkMTA0MDE3OGZkZmQzODI0YmRjYWY5NzcwZjY5MzVlZDcxOTAyIiwiaWF0IjoxNjk0NTE1Nzc3LCJuYmYiOjE2OTQ1MTU3NzcsImV4cCI6MTY5NDUxOTM3Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.jOy4sEbbCK_AwaaNxLiuGGAMQrAhjTeWN1Ja0Au0KOcqlFsBHwVIT9Tw7feYgMKSSQG7dFwLk7N2KL5fHFvsRqGudvyfjw86SHhMmMquMZsC66e7vE0dwiH9-1F-C8iOmE-Yj19sgHub3c0MQixN3AHPeiqo3OIWjxR5lhBKv29sCzwZcJvUSuZXdnf6r9zKzcCM9_tKEmtj8qQ7PGQTGNqsCAA723hQsSaTfXA4btPT7qN8LRPqbN_AyLNno-_OG3jErrTSzS2EvMOm3hwNm2EDghpKLyIaOVTmsIqqVPVS6UpNWWAwGxq4A_Uu-FHNElLV3xa5HyeeXiIdvFnY0A");

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

  const handleOnErrorImg = (e) => { e.target.src = imgDefault }


  return (

    <div className="container bg-danger mb-3">
      <h1 className="text-light text-center pt-4">PLEASE ADOPT ME!!!!!</h1>
      <div className="d-flex flex-wrap justify-content-between">
        {pets.map((item, id) => (
          <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
            {/* <img src={item.url || imgDefault} alt={item.name} onError={handleOnErrorImg} /> */}
            <img src={'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/' + id + '/1/'} alt={item.name} onError={handleOnErrorImg} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <div className="d-flex justify-content-between">
              <Link to={`/adoptme/${id + 1}`}>
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