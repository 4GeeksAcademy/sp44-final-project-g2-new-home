import { id } from "date-fns/locale";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token"),
			tokenApi: localStorage.getItem("tokenApi"),
			message: null,
			experiences: [],
			ApiAnimal: [],
			filteredAnimals: localStorage.getItem("filteredAnimals"),
			animals: [],
			protectors: [],
			volunteers: [],
			users: [],
			user_id: localStorage.getItem("user_id"),
			user_email: localStorage.getItem("user_email"),
			peopleId: localStorage.getItem("peopleId"),
			peopleName: localStorage.getItem("people_name"),
			animalshelterId: localStorage.getItem("animalshelterId"),
			animalshelter_name: localStorage.getItem("animalshelter_name"),
			experienceId: localStorage.getItem("experienceId"),
			favorite: [],
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
					cif: cif,
					address: address,
					city: city,
					zip_code: zipCode,
					web: web
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
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", opts)
					if (resp.status !== 200) {
						alert("Incorrect username or password")
						return false
					}
					const data = await resp.json()
					const userRole = data.user_role;
					const peopleId = data.people_id ? data.people_id : false;
					const peopleName = data.people_name;
					const animalshelterId = data.animalshelter_id ? data.animalshelter_id : false;
					const animalshelter_name = data.animalshelter_name;
					const experienceId = data.experience_id ? data.experience_id : false;

					localStorage.setItem("token", data.access_token)
					localStorage.setItem("user_id", data.user_id);
					localStorage.setItem("user_email", data.user_email);
					localStorage.setItem("peopleId", peopleId);
					localStorage.setItem("peopleName", peopleName);
					localStorage.setItem("animalshelterId", animalshelterId);
					localStorage.setItem("animalshelter_name", animalshelter_name);
					localStorage.setItem("experienceId", experienceId);

					setStore({ token: data.access_token, user_id: data.user_id, user_email: data.user_email, peopleId: peopleId, peopleName: peopleName, experienceId: experienceId, animalshelterId: animalshelterId, animalshelter_name: animalshelter_name }); // Almacena el ID del usuario en el store
					console.log("This came the resp.json: ", data)
					console.log("Token:", data.access_token);
					console.log("User ID:", data.user_id);
					console.log("User Email:", data.user_email);
					console.log("Role:", userRole);
					console.log("People ID:", peopleId, typeof(peopleId));
					console.log("People Name:", peopleName);
					console.log("Animal Shelter ID:", animalshelterId, typeof(animalshelterId));
					console.log("Animal Shelter Name:", animalshelter_name);
					console.log("Experience ID:", experienceId, typeof(experienceId));

					return true
				}
				catch (error) { console.error("There has been an error login in") }
			},
			sync_token_from_local_storage: () => {
				const token = localStorage.getItem("token")
				console.log("Estoy obteniendo el token del localStorage", token)
				if (token && token != "" && token != undefined) setStore({ token: token })
			},
			logout: () => {
				setStore({ message: "" })
				localStorage.clear()
				console.log("APlication just loaded synching the local Storage Token")

				setStore({ token: null })
				setStore({ experienceId: null })
				setStore({ user_id: null })
				setStore({ peopleId: null })
				setStore({ peopleName: null })
				setStore({ animalshelterId: null })
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
				console.log("ESTE ES EL BODY", userData)
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/users/${userData.id}`, requestOptions);
					if (response.status === 200) {
						const data = await response.json();
						console.log("ESTO ES EL DATA EL RESPJSON", data)
						setStore({ user_email: userData.email });
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
			volunteer: async (address, city, zipCode, phone, email, description, availability, peopleId) => {
                const store = getStore();
                const volunteerData = {
                    address: address,
                    city: city,
                    zip_code: zipCode,
                    phone: phone,
                    email: email,
                    description: description,
                    availability: availability,
                };
                const opts = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify(volunteerData)
                };
                try {
                    const resp = await fetch(process.env.BACKEND_URL + `/api/volunteers/${peopleId}`, opts);
                    if (resp.status !== 200) {
                        alert("There has been some error");
                        return false;
                    }
                    const data = await resp.json();
                    console.log("Volunteer registration successfully completed", data);
                    // Aquí redirijo a login
                    return true;
                } catch (error) {
                    console.error("Error during volunteer registration", error);
                    return false;
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
					console.log("ESTO ES DATARESULTS:", data, typeof (data))
					// Despacha una acción con los resultados de las experiencias
					setStore({ experiences: data.results });
				} catch (error) {
					console.error("Error during experiences fetch", error);
					// Puedes despachar una acción de error si lo deseas
				}
			},
			publishExperience: async (title, body, photo, peopleId) => {
				const experienceData = {
					title: title,
					body: body,
					photo: photo,
					peopleId: peopleId
				};

				const opts = {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem("token")}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(experienceData)
				};

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/experiences`, opts);

					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					const data = await resp.json();

					if (data.experience_id) {
						// Actualizar el estado de la aplicación con el ID de la experiencia
						setStore({ experienceId: data.experience_id });
						localStorage.setItem("experienceId", data.experience_id);
						return true;
					} else {
						console.error("Error during experience upload: Missing experience_id in response");
						return false;
					}
				} catch (error) {
					console.error("Error during experience upload", error);
					return false;
				}
			},
			update_experience: async (id, title, body, photo) => {
				try {
					// const token = getStore().token;
					const data = {
						title: title,
						body: body,
						photo: photo,
					};

					const opts = {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("token")}`,
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
			// Supongamos que tienes una función para obtener el token (getStore().token)

			deleteExperience: async (experienceId) => {
				try {
					const token = getStore().token; // Obtener el token de autenticación
					const opts = {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					};

					const resp = await fetch(`${process.env.BACKEND_URL}/api/experiences/${experienceId}`, opts);

					if (resp.status === 200) {
						// Eliminación exitosa, puedes realizar alguna acción adicional si es necesario.
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
			publishAnimal: async (animalData) => {
				const opts = {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem("token")}`,
						'Content-Type': 'application/json', // Establece el encabezado JSON
					},
					body: JSON.stringify(animalData),
				};
				console.log("Este es el animalData del POST: ", animalData)
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/animals`, opts);

					if (resp.status !== 200) {
						alert("There has been some error");
						return false;
					}

					const data = await resp.json();
					setStore({ filteredAnimals: data.results});
					console.log("Animal registration successfully completed", data);
					return true;
				} catch (error) {
					console.error("Error during animal registration", error);
					return false;
				}
			},
			get_shelter_animals: async () => {
				const token = localStorage.getItem("token");
				const user_id = getStore().user_id;
				console.log("user_id: ", user_id)
				const opts = {
					method: 'GET',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				};

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/animals`, opts);

					if (resp.status !== 200) {
						console.error("Error fetching shelter animals");
						return;
					}

					const data = await resp.json();
					console.log(data)

					setStore({ filteredAnimals: data.results });

				} catch (error) {
					console.error("Error during shelter animals fetch", error);
					// Puedes despachar una acción de error si lo deseas
				}
			},
			update_animal: async (id, name, city, phone, size, date, color, type, description, status, gender, age, mixture, contact, photo, isActive) => {
				try {
					const token = getStore().token;
					const data = {
						name: name,
						city: city,
						phone: phone,
						size: size,
						date: date,
						color: color,
						typeOfAnimal: type,
						description: description,
						animalStatus: status,
						gender: gender,
						age: age,
						mixture: mixture,
						contact: contact,
						photo: photo,
						id: id,
						isActive: isActive
					};

					const opts = {
						method: 'PUT',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					};
					console.log("Esta es la data de animal que se envia antes: ", data)
					const resp = await fetch(`${process.env.BACKEND_URL}/api/animals/${id}`, opts);
					const responseData = await resp.json();
					console.log("Esta es la data de animal que se envia despues: ", responseData)

					if (resp.status === 200) {
						// Obtén el estado actual de animales utilizando getStore()
						// const currentAnimals = getStore().animals;
						// const currentAnimals = data.id;
						// const animalResults = getStore().filteredAnimals
						// // Actualiza el animal en el store con la nueva información
						// const updatedAnimals = animalResults.map(animal => {
						//   if (animal.id == currentAnimals) {
						// 	// return { ...animal, ...data };
						// 	animal = data
						//   }
						// });

						// // Establece el nuevo estado de animales utilizando setStore()
						// setStore({ filteredAnimals: updatedAnimals });

						return { success: true, message: 'Animal actualizado exitosamente' };
					} else {
						return { success: false, message: responseData.message };
					}
				} catch (error) {
					console.error('Error al actualizar el animal:', error);
					return { success: false, message: 'Ha ocurrido un error al actualizar el animal' };
				}
			},
			delete_animal: async (animalId) => {
				try {
					const token = getStore().token
					const opts = {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					};

					const resp = await fetch(`${process.env.BACKEND_URL}/api/animals/${animalId}`, opts);

					if (resp.status === 200) {
						// Eliminación exitosa, puedes realizar alguna acción adicional si es necesario.
						return { success: true, message: 'Animal eliminado exitosamente' };
					} else {
						const responseData = await resp.json();
						return { success: false, message: responseData.message };
					}
				} catch (error) {
					console.error('Error al eliminar el animal:', error);
					return { success: false, message: 'Ha ocurrido un error al eliminar el animal' };
				}
			},
			get_all_animals: async () => {const token = localStorage.getItem("token");
			const user_id = getStore().user_id;
			console.log("user_id: ", user_id)
			const opts = {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			};

			try {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/allanimals`, opts);

				if (resp.status !== 200) {
					console.error("Error fetching shelter animals");
					return;
				}

				const data = await resp.json();
				console.log(data)

				setStore({ animals: data.results });

			} catch (error) {
				console.error("Error during shelter animals fetch", error);
				// Puedes despachar una acción de error si lo deseas
			}
		},
			getProtectors: async () => {
				const token = localStorage.getItem("token");
			  
				const opts = {
				  method: 'GET',
				  headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				  },
				};
			  
				try {
				  const resp = await fetch(`${process.env.BACKEND_URL}/api/protectors`, opts);
			  
				  if (resp.status !== 200) {
					console.error("Error fetching protectors");
					return;
				  }
			  
				  const data = await resp.json();
			  
				  // Establece la lista de protectoras en el almacenamiento
				  setStore({ protectors: data.results });
				} catch (error) {
				  console.error("Error during protectors fetch", error);
				  // Puedes despachar una acción de error si lo deseas
				}
			  },
			getVolunteers: async () => {
			const token = localStorage.getItem("token");
			
			const opts = {
				method: 'GET',
				headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				},
			};
			
			try {
				const resp = await fetch(`${process.env.BACKEND_URL}/api/volunteers`, opts);
			
				if (resp.status !== 200) {
				console.error("Error fetching volunteers");
				return;
				}
			
				const data = await resp.json();
			
				// Establece la lista de voluntarios en el almacenamiento
				setStore({ volunteers: data.results });
			} catch (error) {
				console.error("Error during volunteers fetch", error);
				// Puedes despachar una acción de error si lo deseas
			}
			},
			getUsers: async () => {
				try {
				  const token = localStorage.getItem("token");
				  
				  const opts = {
					method: 'GET',
					headers: {
					  'Authorization': `Bearer ${token}`,
					  'Content-Type': 'application/json',
					},
				  };
				  
				  const resp = await fetch(`${process.env.BACKEND_URL}/api/users`, opts);
				  
				  if (resp.status !== 200) {
					console.error("Error fetching users");
					return;
				  }
				  
				  const data = await resp.json();
				  
				  // Aquí puedes hacer lo que necesites con los datos obtenidos, como almacenarlos en un estado o realizar alguna acción en tu aplicación
				  console.log("Data: ", data);
				  setStore({users: data})
				  
				} catch (error) {
				  console.error("Error during users fetch", error);
				  // Puedes manejar el error de acuerdo a tus necesidades, por ejemplo, mostrando un mensaje de error en tu aplicación o despachando una acción de error.
				}
			  },
			  
			deleteVolunteer: async (volunteerId) => {
			try {
				const token = getStore().token;
				const opts = {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				};
		
				const resp = await fetch(`${process.env.BACKEND_URL}/api/volunteers/${volunteerId}`, opts);
		
				if (resp.status === 200) {
					// Eliminación exitosa, puedes realizar alguna acción adicional si es necesario.
					return { success: true, message: 'Voluntario eliminado exitosamente' };
				} else {
					const responseData = await resp.json();
					return { success: false, message: responseData.message };
				}
			} catch (error) {
				console.error('Error al eliminar el voluntario:', error);
				return { success: false, message: 'Ha ocurrido un error al eliminar el voluntario' };
			}
			},
			delete_profile: async (userId) => {
				try {
					const token = getStore().token;
					const opts = {
						method: 'DELETE',
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					};
			
					const resp = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}`, opts);
			
					if (resp.status === 200) {
						// Eliminación exitosa, puedes realizar alguna acción adicional si es necesario.
						return { success: true, message: 'Usuario eliminado exitosamente' };
					} else {
						const responseData = await resp.json();
						return { success: false, message: responseData.message };
					}
				} catch (error) {
					console.error('Error al eliminar el usuario:', error);
					return { success: false, message: 'Ha ocurrido un error al eliminar el usuario' };
				}
			},			
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
			},
			fetchToken: async () => {
				try {
				  const response = await fetch(process.env.BACKEND_URL +'/api/get-token');
				  const data = await response.json();
				  if (data.access_token) {
					return data.access_token;
				  } else {
					throw new Error('Token no encontrado en la respuesta');
				  }
				} catch (error) {
				  console.error('Error obteniendo token:', error);
				  return null; // O devuelve un valor por defecto si es necesario
				}
			},
			

			// Make call if token expired
			makeCall: () => {
				// If current token is invalid, get a new one
				if (!expires || expires - new Date().getTime() < 1) {
					getOAuth().then(function () {
						// use access token
					});
				}
			}

		}
	};
};

export default getState;                                                     
