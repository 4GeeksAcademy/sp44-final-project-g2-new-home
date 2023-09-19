import React, { useState, useContext, useEffect } from "react";
import ImgProtector  from "../../img/logoNewHome.jpeg"


export const Animalshelter = () => {
    const [shelter, setShelter] = useState([]);
    const hostPetfinder = 'https://api.petfinder.com/v2/';
    const url = hostPetfinder + 'organizations/'

    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0M0swTkpSS3hCUmZJcVBEcEh0OWJ1QTUwSDZOcERraVpFdzV5eUVuc1BvNW5RdjJyaSIsImp0aSI6IjA4MGM4ODI3NjIxNzZkY2M0YTVlZGRmYWJkODdjZjgzMGM1N2E2NzQ3YmZmOTBmZjIzNWZjY2Y1YjQ0M2Y3YWMyMzc1Yjg3YTZmZGU4MzI0IiwiaWF0IjoxNjk1MTMxMjM3LCJuYmYiOjE2OTUxMzEyMzcsImV4cCI6MTY5NTEzNDgzNywic3ViIjoiIiwic2NvcGVzIjpbXX0.dbDl2pZLgks54kY5sUkaI6nznnnNKbvmirWsq4muGR5gA9cSqYbpzb9WVwN28KU5J-EIzBlS3InddS2lWNkT2ZBzsdctWlavYfQdPV2dGUFMnvVCr29qID3Hl1cYyr5f0WThGlIvFleRwn2vHKddHeOfwTeB3gOpu6kMnvbXKJS4hFvii0fVYd0TV7RZCgj7eev6MtehXEs4AAQp-rvtYwYSbZ0uQmqJH4q_DaQVj8h4nhj1nXZ4BBSvWOOZhSYOAcgb8pdr22af4aDrUPv-jC7F415xZ8v0OaZRurIFaGhO1_m4Wc3jvijSQ9PHQZG0YxF5jfevLGFxuJKZFRlObg");

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