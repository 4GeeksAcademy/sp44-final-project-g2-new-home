import React, { useState, useContext, useEffect } from "react";
import ImgProtector  from "../../img/logoNewHome.jpeg"
import { Context } from "../store/appContext";

export const Animalshelter = () => {
    const { store, actions } = useContext(Context);
    const [shelter, setShelter] = useState([]);
    const hostPetfinder = 'https://api.petfinder.com/v2/';
    const url = hostPetfinder + 'organizations/'
    const protectors = store.protectos
    useEffect(() => {
        actions.getProtectors()
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjkyYjAxYmNmOTZjMGQxNTlmMTI0Y2E5NWY1ODgxMTdiMmNjODYzMDlmODc2NTIwMWRlMDU1YWYwM2UzZDI3OTkyYmQ2NDYxYWE0NGZiN2IxIiwiaWF0IjoxNjk1MTU3Njk1LCJuYmYiOjE2OTUxNTc2OTUsImV4cCI6MTY5NTE2MTI5NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.mF8D30W5Pq8Z65BwzHLfBVqBFFhFrQD9Xsighleu8HFfUxTJpqcAuioKDadI1jngDutD3bmthycLyJs5S1MAghVMDKPWCpjZ3M7FXcwiHW-agIEO_2TlC0cCQAHVi6b9H8dH8MUczaVCR64GcFDTAFxTapxCXeWRMjSbVTMjqFy8raN9XLqFHYY2T0l0hqaYa1VB0Ee6Y1AN5bdFC_5MU659uaB4Asf8_ARgVdUPZbPVE9NDp64ppaSSUUbBeh0abpDgfSdTJwESvL4SHINfRu-pQMqWKGAJ5aRcvlplhW3KNPegI3ufHCKffk8A-aprS7q8N0iB2bJkEbPGsWJ82g");

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
    )
}