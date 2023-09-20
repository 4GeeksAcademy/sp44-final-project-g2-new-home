import React, { useState, useContext, useEffect } from "react";
import ImgProtector  from "../../img/logoNewHome.jpeg"


export const Animalshelter = () => {
    const [shelter, setShelter] = useState([]);
    const hostPetfinder = 'https://api.petfinder.com/v2/';
    const url = hostPetfinder + 'organizations/'

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjZiNWRhNTk3MmFkNjY5YjBlY2I2MjM3Yzc0ZDkyODU2N2E1Y2RkNWIzOGViZDg1NjhlNTAwYmFjYWMwYTk4ODk4NTBkYzlmZmJjNjU4MjU2IiwiaWF0IjoxNjk1MTUxNDA5LCJuYmYiOjE2OTUxNTE0MDksImV4cCI6MTY5NTE1NTAwOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.JkiRf_zeQZt6j37fx2Hhwjd03n6fQBKmtSNwsSOz87aGYFPc6iSDlYgL1Cd7tesiof935UA0aoI7sUlXECBSnZ52Dw_N0herYhhAMDtzL6B0hhgDSk-AdKIu81nN6DhstnRKgEPT4iugDHq5XHlYJegjO2ny0jYykJfFUCnxCbed2MSr8v_GC8JcPKfladYLzNJzuYv-RiozpD6B_oYEvzwZ2BJEIv_rfpdLNh5ITqg0Ssys_A7g_x_pSkuz-F7oCV0JUismCvO4q_Lwb3TzpTbIrS4nfjMIyD43M8jVKMi2uSyT3VmNnMPjsN7aEZlLeN7yNpOIdtMleqIcqzPPWQ");

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
        </div>
    )
}