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
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjZiOTVhNDBhYWFkYzY5OGNlM2U4ZGZlZjhmMjc2YWQ4NWRmNzYxNzJlZjk3NGUzODdhZjdmZWU2MzdhYzQ3NDMzZjlhNmNmZmIxNDc0NDRhIiwiaWF0IjoxNjk0NjI3MzU2LCJuYmYiOjE2OTQ2MjczNTYsImV4cCI6MTY5NDYzMDk1NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ipINVpSvR45N1NXQFDj2SOPuvTULtaBWjmADWC9ROAftHL7K8_koWV7NOUtxlQJWWVa6TM-1laI9GcaxjyN-t_YsQA8T06ef5_dHJ-5Ns-eyWBAKqsSx5Q3R-iyOZJKzPNhhJ8ZAGxnpKTCXXVlYYWdlbUpSCdUU0epTdkTASxPNtatzdFEfTuUSLkWlw4N2sx4Be-fOp8628NqGWhlmxZE2xe0cd0hcJraIO1mseJry3bIQfYlAxFmsnyO9vXzbh5ZZ5EtVQ8MllDgxjZEx-RWOypVaqiLFgQ1tiLcZcTTuoG6U3VVFWDHqX_ISyAHrAaiEILo8aX1WDHuYLkYoAQ");

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
            <img src={`https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/${item.id}/1/`} alt={item.name} onError={handleOnErrorImg} />
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