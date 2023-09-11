import React, { useState, useContext, useEffect } from "react";
import imgDefault from "../../img/404.png";
// import axios from 'axios';
// import cheerio from 'cheerio';


export const Adoptme = () => {
  const [pets, setPets] = useState([]);
  // const { store, actions } = useContext(Context);
  const apiKey = '43K0NJRKxBRfIqPDpHt9buA50H6NpDkiZEw5yyEnsPo5nQv2ri';
  const apiSecret = 'jswVOs8TwvJn9QUnMY8Ukad0xmrrr3A4rqrtkkUF';
  const hostPetfinder = 'https://api.petfinder.com/v2/';
  const url = hostPetfinder + 'animal?type=dog&page=2';
  // const [imagenUrl, setImagenUrl] = useState('');
  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6ImNlNjE0MzFiOTFhMzI0YzA2ZTYzNDU2NjA4ODE1ZDJhZTFjMjU4NTZhMmFiMzljNDliMzVjODJhMjk4NjQwOGMzN2UxZmJiYzM3N2ExZjBjIiwiaWF0IjoxNjk0NDU1NTcxLCJuYmYiOjE2OTQ0NTU1NzEsImV4cCI6MTY5NDQ1OTE3MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.oy0eVa44TIy99vXyUTINXtS9SOzKbJtUqjHo5YzNoFurp2CPNCo0UonXo6DGi9MxYIIZKD8-lvvGI-HoA29slDWSw--lEXM5HTEaNVo_Lf2QrSAoti4lyrhqRFrMgKSfyvu_q_BnUaaOxaqS0_3h0uBJqfnDgtxm8KITm1QQk5Jvr3TXzzqGnpL7ufuD0vQapgxkX9WGaTiO1VtjZyVFOy6ZiNwg0bZHctRg56ByL63En61etE_NWCUXxKoaTVzL0CfqR2lnjetvgf3gyPGjhTOF9CIrYX1go9EIy5LT-T8nXMzp8CYeQXkgpRbh2c8FdgvvR6WRBaxh6Fz_hy2Qww'

  useEffect(() => {
    // const params = new URLSearchParams({
    //   type: 'dog',
    //   limit: 10
    // });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjhiN2Y0MTc4YzE3MzY3Yjk4YmU1NDdjNmQ0ZmYyOTAzNmRjNWZiZGNkM2YyOWRkNTY4NGZlYWZjMTIwYmYyYWFlZmUxZTdlYmUwYTJjYmJiIiwiaWF0IjoxNjk0NDU5ODE5LCJuYmYiOjE2OTQ0NTk4MTksImV4cCI6MTY5NDQ2MzQxOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.J1-Bi7k5IGTOPBDLsPRNOWobbYgvgAdltFl6lSdYQTWSTfQIyyKVE1IG-DxYHzeiN_pQVJGuGFjgatIw790eaIznsRpQ6jbZJ4tlL1U3XzfqSPEFfhQqJre4H7Z-htRqnel__-vuGF-OFdotK5V7au5KpU73K6vwyqSsOTVLvfIsV3BX7iSIllHp74G_A369hMZT7iNwrGPFUnDjimAsQdkPGxz7q5cGrVBjAs4UuTp5PVPaws9TwdoGSAca9UqMDhDbJlFiakAscf8BruFcQ5UkXshSilfuiekIRieqqMW67Np2k01ZkhWPnDJ5YhH3H4qh7-EFFBlx_ceUIVlvAA");

    var requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://api.petfinder.com/v2/animals?type=dog&page=2", requestOptions)
      .then(response => response.json())
      .then(result => {
        setPets(result.animals);
        console.log(result)
      }
      )
      .catch(error => console.log('error', error));
    // const requestUrl = `${url}`;
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6ImU5YzE0YTQ0MGM3MWUxM2E1YTg5MGU0MDE1MzA2ZTYwNzk1ZTRhNjA2ODFmMjExYjQ4MGNhN2QxMWUyMTY0MDRlMjQ4OGI2ZGU2OGQ5N2JjIiwiaWF0IjoxNjk0NDUxNDcxLCJuYmYiOjE2OTQ0NTE0NzEsImV4cCI6MTY5NDQ1NTA3MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.qYaLhx8SewyVOVZ6-nKj-zjUuI9Pp-XBqTKTYF9uzeQ1uT7eqPVgGnvseRhoEs_YoV2Oby6vW5tPdvjlLZnBhjOAR91Ecmr8nFrqkSTNEou8VyczGrSvoVx0SEjMAlFqE_QbvDOKWW0oh9pLbFvODZvhIAoVIGyxYl53pKP3b3Lf8WgXLLbED-ZSgQFygO-S0w-Amtyl4tCmtEwiULIq6Dj3Osml5W7G1TtJOQdiO1lL4xnuOJCaIePRswjkqHPQc2NWMp4iw9L_ek0KoGExYkpMn5VnA2h22llunWc44rqpBCGCLW--KwcciCUuQM82pTIlkRdkixY4xzYDFxR7Gg");


    // fetch(requestUrl, {
    //   method: 'GET',
    //   headers: myHeaders,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Verifica la consola para asegurarte de que recibiste los datos correctamente.
    //   console.log(data);

    //   // Establece los datos en el estado 'pets'
    //   setPets(data.animals);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
  }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente.

  const handleOnErrorImg = (e) => { e.target.src = imgDefault }


  return (

    <div className="container bg-danger mb-3">
      <h1 className="text-light text-center pt-4">PLEASE ADOPT ME!!!!!</h1>
      <div className="d-flex flex-wrap justify-content-between">
        {pets.map((item, id) => (
          <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
            {/* <img src={item.url || imgDefault} alt={item.name} onError={handleOnErrorImg} /> */}
            <img src={imgDefault} alt={item.name} onError={handleOnErrorImg} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <div className="d-flex justify-content-between">
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