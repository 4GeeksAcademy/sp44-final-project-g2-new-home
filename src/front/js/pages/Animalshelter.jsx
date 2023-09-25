import React, { useState, useContext, useEffect } from "react";
import ImgProtector  from "../../img/logoNewHome.jpeg"
import { Context } from "../store/appContext";
import "../../styles/animalshelter.css";

export const Animalshelter = () => {
    const { store, actions } = useContext(Context);
    const [shelter, setShelter] = useState([]);
    const hostPetfinder = 'https://api.petfinder.com/v2/';
    const url = hostPetfinder + 'organizations/'


    const getShelter = async (token) => {
        const url ='https://api.petfinder.com/v2/organizations';
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
          setShelter(data.organizations);
        } else {
            console.log('error', response.status, response.statusText);
        }
    
        } 
    
      useEffect(() => {
        actions.getProtectors()
        actions.fetchToken().then(token => {
          if (token) {
            console.log(token);
            getShelter(token)
          }
        });
      }, []);


    const handleOnErrorImg = (e) => {
        const newBackupIndex = (backupImageIndex + 1) % backupImages.length;
        setBackupImageIndex(newBackupIndex);
        e.target.src = backupImages[newBackupIndex].default; // Usa .default para obtener la ruta de la imagen importada
    };


    return (
        <div className="body fondoprot">
        <div className="container mb-3">
            <h1 className="text-succes text-center pt-4">Protectors</h1>
            <div className="d-flex flex-wrap justify-content-between">
                {shelter.map((item, id) => (
                    <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
                        <img src={ImgProtector} onError={handleOnErrorImg} />
                        <div className="card-body bg-light">
                            <h5 className="card-title">{item.name}</h5>
                            <p><strong>Email: </strong>{item.email}</p>
                            <p><strong>Phone: </strong>{item.phone}</p>
                            <p><strong>Address: </strong>{item.address.address1}</p>
                            <p><strong>City: </strong>{item.address.city}</p>
                            <p><strong>State: </strong>{item.address.state}</p>
                            <p><strong>Post Code: </strong>{item.address.postcode}</p>
                            <p><strong>Country: </strong>{item.address.country}</p>
                            <p><strong>Website: </strong><a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a></p>
                            {/* <p><strong>Website: </strong>{item.url}</p> */}
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex flex-wrap justify-content-between">
                {store.protectors.map((item) => (
                    <div key={item.id} className="card m-3 rounded" style={{ width: "23rem" }}>
                        <img src={ImgProtector} onError={handleOnErrorImg} />
                        <div className="card-body bg-light">
                            <h5 className="card-title">{item.name}</h5>
                            {/* <p><strong>Email: </strong>{item.email}</p>
                            <p><strong>Phone: </strong>{item.phone}</p> */}
                            <p><strong>Address: </strong>{item.address}</p>
                            <p><strong>City: </strong>{item.city}</p>
                            <p><strong>State: </strong>{item.cif}</p>
                            <p><strong>Post Code: </strong>{item.zip_code}</p>
                            {/* <p><strong>Country: </strong>{item.address.country}</p> */}
                            <p><strong>Website: </strong><a href={item.web} target="_blank" rel="noopener noreferrer">{item.web}</a></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}