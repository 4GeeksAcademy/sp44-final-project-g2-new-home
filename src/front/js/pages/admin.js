import React, { useEffect, useContext } from "react";
import { Context } from '../store/appContext';


export const Admin = () => {
  const { actions, store } = useContext(Context);

 
   
   const sortUsersByRole = (users) => {
    return users.sort((a, b) => {
     
      const roleOrder = {
        Admin: 1,
        AnimalShelter: 2,
        Person: 3,
      };

      return roleOrder[a.role] - roleOrder[b.role];
    });
  };
  

  useEffect(() => {
    // Llama a la función getUsers() del contexto para obtener la lista de usuarios
    actions.getUsers();
    console.log("Esto tiene estoreeeeee useeeeeerS: ",store.users)
  }, []); // El segundo argumento vacío asegura que esta función se ejecute solo una vez al montar el componente

  const sortedUsers = sortUsersByRole(store.users);


return (
    <div className="container mb-3">
      <h1 className="titulos text-center pt-4 mt-4 mb-5 esmeralda">List of Users</h1>
      <div className="table-responsive pb-5">
        <table className="table table-striped mt-5 border border-4 text-center">
          <thead>
            <tr className="text-center custom-row">
              <th scope="col">EMAIL</th>
              <th scope="col">ROLE</th>
              <th scope="col">NAME</th>
              <th scope="col">LAST NAME</th>
              <th scope="col">CIF</th>
              <th scope="col">CITY</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">ZIP CODE</th>
              <th scope="col">WEB</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr className="text-center" key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.name || "/"}</td>
                <td>{user.lastname || "/"}</td>
                <td>{user.cif || "/"}</td>
                <td>{user.city || "/"}</td>
                <td>{user.address || "/"}</td>
                <td>{user.zip_code || "/"}</td>
                <td>
                  {user.web ? (
                    <a href={user.web} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-globe text-primary" title={user.web}></i>
                    </a>
                  ) : (
                    "/"
                  )}
                </td>
                {/* Agrega una columna para la opción de desactivar la cuenta aquí */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};