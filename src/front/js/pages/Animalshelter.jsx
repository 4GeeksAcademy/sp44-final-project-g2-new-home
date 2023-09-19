import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";


export const Animalshelter = () => {
    const [shelter, setShelter] = useState([]);
    const hostPetfinder = 'https://api.petfinder.com/v2/';
    const url = hostPetfinder + 'organizations/'

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6ImMwYTdkNjI5MGY4Y2JjZjdjMzQzZWU2MTZhM2IwMzIwYzI5NTMwMDIyNWExNGM2NTlmYzEzZTIyZGI1MDIyMjg0YTI3MTg0NjRkNDczYjVlIiwiaWF0IjoxNjk1MTE5MTU4LCJuYmYiOjE2OTUxMTkxNTgsImV4cCI6MTY5NTEyMjc1OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.PUUVm_z9bk0-_vzmt-nRB4Gvf13DjlJt_WRecBsY3xmcE2d3z62OvYlroOzipQO9YlcfMT8hZ9yZ9rWHiyUy-wPpOOCNzTi_7SKWvqJbXyOyjF5Zz87Z6KyZyzcuDsML_neQxnC_quT90YOOksCV8vMZd-wS64BWWZZXxOr6950-8vuFHHa8DMULzRBynJGQGNFKn-S7sL9-sNRHPpH1VnADXHTo4CTf5h7LNyDz4iHFGH6ys0VrSuVvdXYQB-9ZdWm8JnSQqgdamCGyHUUGr7itcnXIySNl2OPbo7ZgadjrnAt42uaWC2de6Sx7NqE2Vq5bIVSdH_SvfuVTQ1WkFw");

        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setShelter(result.organizations);
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
        <div className="container mb-3">
            <h1 className="text-primary text-center pt-4">Protectors</h1>
            <div className="d-flex flex-wrap justify-content-between">
                {shelter.map((item, id) => (
                    <div key={id} className="card m-3 rounded" style={{ width: "23rem" }}>
                        <img src={`https://photos.petfinder.com/photos/organizations/${item.id}/1/`} onError={handleOnErrorImg} />
                        <div className="card-body">
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
        </div>
    )
}