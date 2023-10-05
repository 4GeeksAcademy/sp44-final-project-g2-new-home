import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";



export const Profile = () => {
    const { actions, store } = useContext(Context);
    const [userData, setUserData] = useState({ email: '', role: '', details: {} }); // Inicializa details como un objeto vacío
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e, field) => {
      
        console.log(`handleInputChange called with field: ${field}`);
        
        // Maneja los cambios en los campos editables aquí
        if (field === 'email') {
          // Maneja el campo de correo electrónico de manera diferente
          setUserData({
              ...userData,
              email: e.target.value,
          });
      } else {
          // Maneja los cambios en otros campos editables dentro de 'details'
          setUserData({
              ...userData,
              details: {
                  ...userData.details,
                  [field]: e.target.value,
              },
          });
      }
      };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Datos de userData antes de enviar:', userData);
        // Envía los datos editados al servidor aquí, por ejemplo, usando una función de acción de tu contexto
        const updatedData = {
            ...userData,
            // user_id: store.user_id, 
        };
        console.log('Datos actualizados antes de la solicitud PUT:', userData);
        actions.update_profile(userData);
        localStorage.setItem("user_data", JSON.stringify(userData));
        
        setIsEditing(false);
    };

    const handleUnsubscribe = () => {
        const confirmDelete = window.confirm("¿Seguro que desea darse de baja? Esta acción no se puede deshacer.");
        if (confirmDelete) {
            actions.unsubscribe_user(store.user_id); // Llama a la función que eliminará al usuario
        }
    };

    const handleToggleActiveClick = () => {
            
        // Cambia el valor de is_active en el estado local
        const desactivateId = userData.id;
         
        actions.delete_profile(desactivateId)
            .then(response => {
                if (response.success) {
                    actions.logout()
                    alert("Account successfully deactivated"); 
                    navigate("/");
                } else {
                    // Maneja el caso de error en la actualización
                    alert(response.message);
                }
            })
            .catch(error => {
                // Maneja errores de red u otros errores
                console.error('Error updating user active status:', error);
            });
    };
    
    const handleGoHome = () => {
        navigate("/");
    }

    useEffect(() => {
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem("user_data"));
        let user_id = localStorage.getItem("user_id")
        let token = localStorage.getItem("token")
        if (!user_id && !token){
            user_id = store.user_id
            token = store.token
        }
        console.log("Valor de store.user_id:", store.user_id);
        console.log("Valor de store.token:", store.token);
        if (userDataFromLocalStorage) {
            setUserData(userDataFromLocalStorage);
        } else {
            actions.get_profile(user_id, token)
                .then(data => {
                    if (data) {
                        setUserData({ ...data }); // Asegúrate de que estás propagando todos los datos, incluidos los detalles de People
                        console.log("This is the data: ", data);
                        // Guarda userData en el localStorage para futuras recargas
                        localStorage.setItem("user_data", JSON.stringify(data));
                    } else {
                        console.log("ERROOOOOR NO SE PUDO OBTENER PERFIL")
                        setUserData({ email: '', role: '', details: {} }); // Establece un objeto vacío en caso de error
                    }
                });
        }
    }, [actions, store.user_id, store.token]);

    return (
      <div className="container mt-5">
          <h1 className="text-center esmeralda  my-3">My Profile</h1>
          <div className="card fondo mx-auto mt-5" style={{ maxWidth: "500px" }}>
              <div className="card-body">
                  {userData.role === 'Person' && <h2 className="text-center coloresmeralda">You are the user nº: <b>{userData.details.user_id}</b></h2>}
                  {userData.role === 'AnimalShelter' && <h2 className="text-center coloresmeralda">You are the user nº: <b>{userData.details.user_id}</b></h2>}
              </div>
              <div className="card-body">
                  {isEditing ? (
                      <form onSubmit={handleFormSubmit}>
                          {/* Agrega campos editables aquí, por ejemplo: */}
                          {userData.role === 'Person' && (
                            <div>
                              <div className="mb-3">
                                  <label htmlFor="email" className="form-label"><b>Email:</b></label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="email"
                                      value={userData.email}
                                      onChange={(e) => handleInputChange(e, 'email')}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="name" className="form-label"><b>Name:</b></label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      value={userData.details.name}
                                      onChange={(e) => handleInputChange(e, 'name')}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="lastname" className="form-label"><b>Last Name:</b></label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="lastname"
                                      value={userData.details.lastname}
                                      onChange={(e) => handleInputChange(e, 'lastname')}
                                  />
                              </div>
                            </div>
                          )}
                          {userData.role === 'AnimalShelter' && (
                              <div>
                                  <div className="mb-3">
                                      <label htmlFor="email" className="form-label"><b>Email:</b></label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="email"
                                          value={userData.email}
                                          onChange={(e) => handleInputChange(e, 'email')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                  <label htmlFor="name" className="form-label"><b>Name:</b></label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      value={userData.details.name}
                                      onChange={(e) => handleInputChange(e, 'name')}
                                  />
                              </div>
                                  <div className="mb-3">
                                      <label htmlFor="cif" className="form-label"><b>CIF:</b></label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="cif"
                                          value={userData.details.cif}
                                          onChange={(e) => handleInputChange(e, 'cif')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="address" className="form-label"><b>Address:</b></label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="address"
                                          value={userData.details.address}
                                          onChange={(e) => handleInputChange(e, 'address')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="zip_code" className="form-label"><b>Zip Code:</b></label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="zip_code"
                                          value={userData.details.zip_code}
                                          onChange={(e) => handleInputChange(e, 'zip_code')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="city" className="form-label"><b>City:</b></label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="city"
                                          value={userData.details.city}
                                          onChange={(e) => handleInputChange(e, 'city')}
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="web" className="form-label"><b>Web:</b></label>
                                      <input
                                          type="text"
                                          className="form-control"
                                          id="web"
                                          value={userData.details.web}
                                          onChange={(e) => handleInputChange(e, 'web')}
                                      />
                                  </div>
                              </div>
                          )}
                          <div className='col-md-12 d-flex justify-content-center'>
                            <button type="button" className="btn btn-secondary me-3" onClick={() => setIsEditing(false)}><b>Cancel</b></button>
                            <button type="submit" className="btn btn-success "><b>Save</b></button>
                          </div>
                      </form>
                  ) : (
                    <div className='container'>
                        <div className="row d-flex justify-content-center">
                            {userData.role === 'AnimalShelter' ? (
                                <>
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    {/* Contenido para el rol de Protectora */}
                                    <p className='fs-5'><b>Role</b>: {userData.role}</p>
                                    <p className='fs-5'><b>Email:</b> {userData.email}</p>
                                    <p className='fs-5'><b>Name:</b> {userData.details.name}</p>
                                    <p className='fs-5'><b>CIF:</b> {userData.details.cif}</p>
                                    <p className='fs-5'><b>City:</b> {userData.details.city}</p>
                                    <p className='fs-5'><b>Address:</b> {userData.details.address}</p>
                                    <p className='fs-5'><b>Zip_code:</b> {userData.details.zip_code}</p>
                                    <p className='fs-5'><b>Web:</b> {userData.details.web}</p>
                                    {userData.details.trophy && (
                                    <p>
                                        Trophy: <i className="fas fa-award"></i>
                                    </p>
                                    )}
                                </div>
                                <div className="col-md-2"></div>
                                </>
                            ) : (
                                <>
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    {/* Contenido para otros roles */}
                                    <p className='fs-5 ms-4'><b>Role</b>: {userData.role}</p>
                                    <p className='fs-5 ms-4'><b>Email:</b> {userData.email}</p>
                                    <p className='fs-5 ms-4'><b>Name:</b> {userData.details.name}</p>
                                    <p className='fs-5 ms-4'><b>Last name:</b> {userData.details.lastname}</p>
                                </div>
                                <div className="col-md-2"></div>
                                </>
                            )}
                        </div>
                        <div className='row d-flex justify-content-center mt-5'>
                            <div className='col-md-6 '>
                                {/* <button onClick={handleToggleActiveClick} className="btn btn-danger">
                                <b>'Desactivate account'</b>
                                </button> */}
                                {/* <button onClick={handleUnsubscribe} className="btn btn-primary ms-3">Unsubscribe</button> */}
                                <button onClick={handleGoHome} className="btn btn-secondary btn lg me-3"><b>Back</b></button>
                                <button onClick={handleEditClick} className="btn btn-success btn lg"><b>Edit Profile</b></button>
                            </div>
                        </div>
                   </div> 
                )}
            </div>
        </div>
    </div>
  )
}
