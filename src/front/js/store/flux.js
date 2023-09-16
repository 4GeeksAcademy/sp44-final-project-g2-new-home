const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token"),
			message: null,
			experiences: localStorage.getItem("experiences"),
			user_id: localStorage.getItem("user_id"),
			user_email: localStorage.getItem("user_email"),
			peopleId: localStorage.getItem("peopleId"),
			experienceId:localStorage.getItem("experienceId"),
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			register: async (email, password, isActive, userType, name, lastname, cif, address, city, zipCode, web) => {
				const userData = {
					email: email,
					password: password,
					is_active: isActive,
					role: userType,
					name: name,
					lastname: lastname,
					cif : cif,
					address : address,
					city : city,
					zip_code : zipCode,
					web : web
				  };
				const opts = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userData)
				};
				
				try {
				  const resp = await fetch(process.env.BACKEND_URL + "/api/users", opts);
				  if (resp.status !== 200) {
					alert("There has been some error");
					return false;
				  }
				  const data = await resp.json();
				  console.log("Registration successful", data);
				  // Aquí redirijo a login
				  return true;
				} catch (error) {
				  console.error("Error during registration", error);
				  return false;
				}
			},
			login: async (email, password) => {
				const opts = {
					method: 'POST',
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				} 
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", opts)
					if(resp.status !== 200) {
					alert("There has been some error")
					return false
					}
					const data = await resp.json()
					const peopleId = data.people_id;
					console.log("This is the resp.json: ", data)	
					console.log("User ID:", data.user_id); // Imprime el ID del usuario
					console.log("User Email:", data.user_email); 
					localStorage.setItem("token", data.access_token)
					localStorage.setItem("peopleId", peopleId);
					localStorage.setItem("experienceId", data.experience_id); // Actualiza el peopleId en localStorage
					//determinar el role...y guardar su correspondiente id en el store
					setStore({ token: data.access_token, user_id: data.user_id, user_email: data.user_email, peopleId: peopleId, experienceId: data.experience_id }); // Almacena el ID del usuario en el store
					console.log("This came from the backend", data)
					console.log("Token:", data.access_token);
					console.log("User ID:", data.user_id);
					console.log("User Email:", data.user_email);
					console.log("People ID:", peopleId);
					console.log("Experience ID:", data.experience_id);

					return true
				}
				catch(error){console.error("There has been an error login in")}	
			},
			sync_token_from_local_storage: () => {
				const token = localStorage.getItem("token")
				console.log("You are login out successfully!!!!!!!!")
				if(token && token != "" && token != undefined) setStore({token: token})
			},
			logout: () => {
				setStore({ message: "" })
				localStorage.clear()
				console.log("APlication just loaded synching the local Storage Token")
				setStore({token: null}) 
				setStore({experienceId: null})
				setStore({user_id: null})
			},
			get_profile: async (userId) => {
				console.log('getUserProfile llamado con userId:', userId);
				const token = getStore().token;
			
				if (!token || !userId) {
					// Manejar el caso en el que el token o el userId no estén disponibles
					return null;
				}
			
				const requestOptions = {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`
					}
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/users/${userId}`, requestOptions);
					if (response.status === 200) {
						const data = await response.json();
						return data.results; // Devuelve los datos del perfil del usuario
					} else {
						// Manejar el caso en el que la solicitud no sea exitosa
						return null;
					}
				} catch (error) {
					// Manejar errores de red u otros errores
					console.error('Error fetching user profile:', error);
					return null;
				}
			},
			update_profile: async (userData) => {
				console.log('update_profile llamado con userData:', userData);
				let token = localStorage.getItem("token");
				console.log('user_id en userData:', userData.user_id);

				if (!token) {
				  // Manejar el caso en que el token no esté disponible
				  return { success: false, message: "Token de autenticación no disponible" };
				}
			  
				const requestOptions = {
				  method: 'PUT',
				  headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json', // Agregar el encabezado de tipo de contenido JSON
				  },
				  body: JSON.stringify(userData), // Envía todo el objeto userData
				};
				console.log("ESTE ES EL BODY",userData)
				try {
				  const response = await fetch(process.env.BACKEND_URL + `/api/users/${userData.id}`, requestOptions);
				  if (response.status === 200) {
					const data = await response.json();
					console.log("ESTO ES EL DATA EL RESPJSON", data)
					setStore({ user_email : userData.email });
					localStorage.setItem("user_email", userData.email);
					return { success: true, message: "Perfil actualizado exitosamente", data };
				  } else {
					// Manejar el caso en que la solicitud no sea exitosa
					return { success: false, message: "No se pudo actualizar el perfil" };
				  }
				} catch (error) {
				  // Manejar errores de red u otros errores
				  console.error('Error updating user profile:', error);
				  return { success: false, message: "Error al actualizar el perfil" };
				}
			},
			unsubscribe_user: async (userId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						},
					});
			
					if (response.status === 200) {
						localStorage.clear();
						// Puedes realizar alguna acción adicional después de que el usuario se haya dado de baja, como redirigirlo a una página de despedida.
						// Por ejemplo:
						// window.location.href = '/goodbye';
					} else {
						console.error('No se pudo dar de baja al usuario.');
						// Puedes mostrar un mensaje de error al usuario o tomar otra acción adecuada.
					}
				} catch (error) {
					console.error('Error al intentar dar de baja al usuario:', error);
					// Manejar errores de red u otros errores
				}
			},
			get_experiences: async () => {
				const opts = {
				  method: 'GET',
				  headers: {
					'Authorization': `Bearer ${localStorage.getItem("token")}`,
					'Content-Type': 'application/json', // Establece el encabezado JSON si es necesario
				  },
				};
			  
				try {
				  const resp = await fetch(`${process.env.BACKEND_URL}/api/experiences`, opts);
			  
				  if (resp.status !== 200) {
					console.error("Error fetching experiences");
					return;
				  }
			  
				  const data = await resp.json();
			  
				  // Despacha una acción con los resultados de las experiencias
				  setStore({ experiences: data.results });
				} catch (error) {
				  console.error("Error during experiences fetch", error);
				  // Puedes despachar una acción de error si lo deseas
				}
			},
			publishExperience: async (title, body, photo) => {
				const peopleId = getStore().peopleId;
				const experienceData = {
					title: title,
					body: body,
					photo: photo,
				};
				console.log("A VER LA EXPERIENCIAAA: ",experienceData)
				const opts = {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem("token")}`,
						'Content-Type': 'application/json', // Establece el encabezado JSON
					},
					body: JSON.stringify(experienceData)
				};
			
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/experiences/${peopleId}`, opts);
				
					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					  }
					  const data = await resp.json();
					  console.log("Experiencie registration successfully completed", data);
					  return true;
					} catch (error) {
					  console.error("Error during experience update", error);
					  return false;
					}
  			},
			update_experience: async (id, title, body, photo) => {
				try {
					const token = localStorage.getItem('token');
					const data = {
					title: title,
					body: body,
					photo: photo,
					};
				
					const opts = {
					method: 'PUT',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'					
					},
					body: JSON.stringify(data)
					};
			  	
					const resp = await fetch(`${process.env.BACKEND_URL}/api/experiences/${id}`, opts);
					const responseData = await resp.json();
				
					if (resp.status === 200) {
						// Obtén el estado actual de experiences utilizando getStore()
						const currentExperiences = getStore().experiences;
				  
						// Actualiza la experiencia en el store con la nueva información
						const updatedExperiences = currentExperiences.map(experience => {
						  if (experience.id === id) {
							return { ...experience, ...data };
						  } else {
							return experience;
						  }
						});
				  
						// Establece el nuevo estado de experiences utilizando setStore()
						setStore({ experiences: updatedExperiences });
				
						return { success: true, message: 'Experiencia actualizada exitosamente' };
					} else {
						return { success: false, message: responseData.message };
					}
				} catch (error) {
				  console.error('Error al actualizar la experiencia:', error);
				  return { success: false, message: 'Ha ocurrido un error al actualizar la experiencia' };
				}
			},
			delete_experience: async (id) => {
				try {
					const token = localStorage.getItem('token');
					const opts = {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					};
				
				
				  const resp = await fetch(`${process.env.BACKEND_URL}/api/experiences/${id}`, opts);
				
				  if (resp.status === 200) {
					// Obtén el estado actual de experiences utilizando getStore()
					const currentExperiences = getStore().experiences;
				
					// Filtra las experiencias para eliminar la que coincida con el ID
					const updatedExperiences = currentExperiences.filter(experience => experience.id !== id);
				
					// Establece el nuevo estado de experiences utilizando setStore()
					setStore({ experiences: updatedExperiences });
				
					return { success: true, message: 'Experiencia eliminada exitosamente' };
				  } else {
					const responseData = await resp.json();
					return { success: false, message: responseData.message };
				  }
				} catch (error) {
				  console.error('Error al eliminar la experiencia:', error);
				  return { success: false, message: 'Ha ocurrido un error al eliminar la experiencia' };
				}
			}, 
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
