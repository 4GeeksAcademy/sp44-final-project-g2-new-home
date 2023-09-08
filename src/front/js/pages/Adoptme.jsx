import React, { useState, useContext, useEffect } from "react";
import  imgDefault  from "../../img/404.png"


export const Adoptme = () => {
    const [ pets, setPets ] = useState([]);
    // const { store, actions } = useContext(Context);
    const apiKey = '43K0NJRKxBRfIqPDpHt9buA50H6NpDkiZEw5yyEnsPo5nQv2ri';
    const apiSecret = 'jswVOs8TwvJn9QUnMY8Ukad0xmrrr3A4rqrtkkUF';
    const url = 'https://api.petfinder.com/v2/animals/api/';

    useEffect(() => {
        const params = new URLSearchParams({
          type: 'dog',
          limit: 10
        });
    
        const requestUrl = `${url}?${params.toString()}`;
    
        fetch(requestUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}:${apiSecret}`,
            "Content-Type": "application/json",
          }
        })
          .then(response => response.json())
          .then(data => {
            // Verifica la consola para asegurarte de que recibiste los datos correctamente.
            console.log(data);
    
            // Establece los datos en el estado 'pets'
            setPets(data.animals);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []); // El segundo argumento [] indica que este efecto solo se ejecuta una vez al montar el componente.
    
    const handleOnErrorImg = (e) => {e.target.src = imgDefault}


    return (

        <div className="container bg-danger mb-3">
      <h1 className="text-light text-center pt-4">PLEASE ADOPT ME!!!!!</h1>
      <div className="d-flex flex-wrap justify-content-between">
        {pets.map((item, id) => (
          <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
            <img src={item.photos[0].large || imgDefault} alt={item.name} onError={handleOnErrorImg} />
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