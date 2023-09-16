"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Volunteer, ExperiencesBlog, Rating, Report, People, AnimalShelter, TipsPets, Animal
from api.utils import generate_sitemap, APIException
from sqlalchemy import func
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required, current_user
from flask_jwt_extended import decode_token
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)


@api.route('/img', methods=['POST', 'GET'])
def upload_image():
   img = request.files["img"]
   print(img)
   img_url = cloudinary.uploader.upload(img)

   return jsonify({"img_url: ": img_url["url"]}), 200


@api.route('/users', methods=['POST', 'GET'])
def handle_users():
    if request.method =='GET':
        # response_body = {"message": "Esto devuelve el get del endpooint users"}
        users = db.session.execute(db.select(User).order_by(User.email)).scalars()
        results =[item.serialize() for item in users]
        response_body ={
            "message":"Esto devuelve el endpoint de userst el GET",
            "results": results,
            "status": "ok" }
        return response_body, 200
    if request.method =='POST':
      request_body = request.get_json()
      print(request_body)
      if request_body['role'] == 'Person':
         user = User(                                     #Creamos una instancia de user
                     email = request_body["email"],
                     password = request_body['password'],
                     is_active = request_body['is_active'],
                     role = request_body['role'])
         db.session.add(user)
         db.session.commit()
         # Obtén el ID del usuario recién creado
         user_id = user.id

         person = People(
            name=request_body['name'],
            lastname=request_body['lastname'],
            trophy=request_body.get('trophy', False),
            user_id = user_id
        )
         db.session.add(person)
         db.session.commit()

      elif request_body['role'] == 'AnimalShelter':
         user = User(
               email=request_body['email'],
               password=request_body['password'],
               is_active=request_body['is_active'],
               role=request_body['role']
         )
         db.session.add(user)
         db.session.commit()
         # Obtén el ID del usuario recién creado
         user_id = user.id
         print("Antes de animal shelter", request_body)
         animal_shelter = AnimalShelter(
               name=request_body['name'],
               address=request_body['address'],
               city=request_body['city'],
               zip_code=request_body['zip_code'],
               web=request_body['web'],
               cif=request_body['cif'],
               user_id = user_id
         )
         db.session.add(animal_shelter)
         db.session.commit()
         print("despues de la solicitud", request_body)
      response_body = {
            "message": "Adding new user",
            "status": "ok",
            "new_user": request_body}
      # response_body = {"message": "Esto devuelve el POST del endpooint users"}
      return response_body, 200


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_user(id):
   if request.method == 'GET': 
    user_with_details = db.session.query(User, People, AnimalShelter).\
        join(People, User.id == People.user_id, isouter=True).\
        join(AnimalShelter, User.id == AnimalShelter.user_id, isouter=True).\
        filter(User.id == id).\
        first() 

    if user_with_details:
        user, person, shelter = user_with_details
        response_body = {
            "status": "ok",
            "results": {
                **user.serialize(),
                "details": person.serialize() if user.role == 'Person' else shelter.serialize() if user.role == 'AnimalShelter' else {}
            }
        }
        print(response_body)
        return response_body, 200
    else:
        response_body = {"message": "User not found", "status": "error"}
        return response_body, 404
   if request.method == 'PUT':
    # Obtener el usuario actual desde la base de datos
    user = User.query.get(id)
    
    # Verificar si el usuario existe
    if not user:
        return {"message": "User not found", "status": "error"}, 404

    # Obtener los datos de la solicitud PUT
    data = request.json
    
    # Verificar si el usuario tiene el rol correcto
    if user.role == 'Person' and 'details' in data:
        # Actualizar los datos en la tabla People
        person_data = data['details']
        person = People.query.filter_by(user_id=id).first() # aqui buscas el primer registro en people que coincida como usuario o user en la tabla user...
        if person:
            # Actualizar los campos de la tabla People
            person.name = person_data.get('name', person.name)
            person.lastname = person_data.get('lastname', person.lastname)
        
    elif user.role == 'AnimalShelter' and 'details' in data:
        # Actualizar los datos en la tabla AnimalShelter
        shelter_data = data['details']
        shelter = AnimalShelter.query.filter_by(user_id=id).first()
        if shelter:
            # Actualizar los campos de la tabla AnimalShelter
            shelter.address = shelter_data.get('address', shelter.address)
            shelter.cif = shelter_data.get('cif', shelter.cif)
            shelter.city = shelter_data.get('city', shelter.city)
            shelter.name = shelter_data.get('name', shelter.name)
            shelter.web = shelter_data.get('web', shelter.web)
            shelter.zip_code = shelter_data.get('zip_code', shelter.zip_code)
    
    # Actualizar el correo electrónico en la tabla User si se proporciona
    if 'email' in data:
        user.email = data['email']

    # Guardar los cambios en la base de datos
    db.session.commit()
    return {"message": "User data updated successfully", "status": "ok"}, 200
   if request.method == 'DELETE':
      user = User.query.get(id)
      # Verificar el rol del usuario
      if user.role == 'Person':
         # Si el usuario tiene el rol 'Person', también debemos eliminar los datos en la tabla 'People'
         person = People.query.filter_by(user_id=id).first()
         if person:
               db.session.delete(person)  # Eliminar datos en la tabla 'People'

   elif user.role == 'AnimalShelter':
      # Si el usuario tiene el rol 'AnimalShelter', también debemos eliminar los datos en la tabla 'AnimalShelter'
      shelter = AnimalShelter.query.filter_by(user_id=id).first()
      if shelter:
            db.session.delete(shelter)  # Eliminar datos en la tabla 'AnimalShelter'

   # Ahora, eliminamos el usuario de la tabla 'User'
   db.session.delete(user)
   db.session.commit()
   # user = db.get_or_404(User, id)
   db.session.delete(user) 
   db.session.commit()
   response_body = {"message": "DELETED user",
                     "status": "ok",
                     "user_deleting": id,
                     }
   return response_body, 200


def update_vote_stars(user_id):
    # Calcula el nuevo valor promedio de rating
    all_ratings = Rating.query.filter_by(rated_id=user_id).all()
    total_ratings = len(all_ratings)
    
    if total_ratings == 0:
        # Si no hay valoraciones, pon los valores en 0
        vote_count = 0
        sum_total_votes = 0
        calculated_rating = 0
    else:
        total_rating_value = sum(rating.rating for rating in all_ratings)
        vote_count = total_ratings
        sum_total_votes = total_rating_value
        calculated_rating = total_rating_value / total_ratings
    
    # Actualiza los campos en la tabla "User"
    user = User.query.get(user_id)
    user.vote_count = vote_count
    user.sum_total_votes = sum_total_votes
    user.calculated_rating = calculated_rating
    db.session.commit()


@api.route('/ratings', methods=['POST'])
def handle_ratings():
    request_body = request.get_json() 
    rater_id = request_body.get('user_id')
    rated_id = request_body.get('rated_id')
    rating_value = request_body.get('rating')

    if rater_id is None or rated_id is None or rating_value is None:
        return jsonify({"message": "Invalid request body"}), 400

    # Verifica si los usuarios existen y son de los tipos adecuados
    rater = User.query.get_or_404(rater_id)
    rated = User.query.get_or_404(rated_id)

    # Verifica que los roles sean los adecuados
    allowed_roles = ['Person', 'AnimalShelter']

    if rater.role not in allowed_roles or rated.role not in allowed_roles:
        return jsonify({"message": "Invalid user roles"}), 400

    # Validar que el rater no esté votando a sí mismo
    if rater_id == rated_id:
        return jsonify({"message": "Users cannot rate themselves"}), 400

    # Validar que el valor de la valoración esté entre 1 y 5
    if not (1 <= rating_value <= 5):
        return jsonify({"message": "Rating value must be between 1 and 5"}), 400

    # Definir new_rating con un valor inicial None
    new_rating = None
    # Verificar si ya existe una calificación previa del mismo rater al mismo rated
    existing_rating = Rating.query.filter_by(rater_id=rater_id, rated_id=rated_id).first()

    if existing_rating:
        # Si ya existe una calificación, actualiza su valor
        existing_rating.rating = rating_value
    else:
        # Si no existe una calificación previa, agrega una nueva calificación
        new_rating = Rating(rater_id=rater_id, rated_id=rated_id, rating=rating_value)
        db.session.add(new_rating)

    db.session.commit()
    # Obtén el usuario calificado y sus valoraciones
    rated_user = User.query.get(rated_id)
    all_ratings = Rating.query.filter_by(rated_id=rated_id).all()
    # Calcula el nuevo valor promedio de rating
    total_ratings = len(all_ratings)  # Obtenemos el número de votaciones directamente de la lista
    total_rating_value = sum(rating.rating for rating in all_ratings)
    new_rating_value = total_rating_value / total_ratings
    # Actualiza el campo "rating" en la tabla "User"
    rated_user.rating = new_rating_value
    db.session.commit()
    # Ahora, obtener la sumatoria de votos totales y el contador de votos para rated_id
    sum_total_votes = db.session.query(func.sum(Rating.rating)).filter_by(rated_id=rated_id).scalar()
    vote_count = db.session.query(func.count(Rating.rating)).filter_by(rated_id=rated_id).scalar()
    # Llamar a la función para calcular y actualizar los valores de sum_total_votes, vote_count y rating
    update_vote_stars(rated_id)

    response_body = {
        "message": "Rating added successfully",
        "status": "ok",
        "sum_total_votes": sum_total_votes,
        "vote_count": vote_count
    }
    # Verificar si new_rating se definió y si es el caso, agregarlo a la respuesta
    if new_rating:
        response_body["new_rating"] = new_rating.serialize()
    
    return response_body, 201

  
@api.route('/volunteers', methods=['POST', 'GET'])
@jwt_required()
def handle_volunteers():
   if request.method == 'GET':
      # response_body = {"message": "Esto devuelve el get del endpooint volunteers"}
      volunteers = db.session.execute(db.select(Volunteer).order_by(Volunteer.email)).scalars()
      results =[item.serialize() for item in volunteers]
      response_body ={
         "message":"Esto devuelve el endpoint de volunteers el GET",
         "results": results,
         "status": "ok" }
      return response_body, 200
   if request.method =='POST':
      request_body = request.get_json()
      print(request_body)
      volunteer = Volunteer (
                                 email = request_body["email"],
                                 address = request_body["address"],
                                 city = request_body["city"],
                                 zip_code = request_body["zip_code"],
                                 phone = request_body["phone"],
                                 description = request_body["description"],
                                 availability = request_body["availability"],
                                 people_id = request_body["people_id"])
                                 
      db.session.add(volunteer)
      db.session.commit()
       # Obtén el ID del usuario 
      # user_id = user.id

      # user = Users (
      #    email = request_body["email"],
      # )
      # db.session.add(user)
      # db.session.commit()

      response_body = {
         "message": "adding new volunteer",
         "status": "ok",
         "new_volunteer": request_body}
      # response_body = {"message": "Esto devuelve el POST del endpooint volunteers"}
      return response_body, 200
   
@api.route('/volunteers/<int:id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
@jwt_required()
def handle_volunteer(id):
   if request.method == 'GET': 
      volunteer = db.get_or_404(Volunteer, id) 
      print(volunteer)
      response_body = {
         "status": "ok",
         "results": volunteer.serialize()
      }
      return response_body, 200
   if request.method == 'PUT':
      request_body = request.get_json()
      volunteer = Volunteer.query.get_or_404(id)
      volunteer.address = request_body["address"],
      volunteer.city = request_body["city"],
      volunteer.zip_code = request_body["zip_code"],
      volunteer.phone = request_body["phone"],
      volunteer.email = request_body["email"],
      volunteer.description = request_body["description"],
      volunteer.availability = request_body["availability"]
      db.session.commit() 
      response_body = {"message": "Update volunteer",
                       "status": "ok",
                        }
      return response_body, 200
   if request.method =='POST':
      request_body = request.get_json()
      print(request_body)
      people = People.query.get(id)
      # user_id = user.id
      volunteer = Volunteer (
                                 email = request_body["email"],
                                 address = request_body["address"],
                                 city = request_body["city"],
                                 zip_code = request_body["zip_code"],
                                 phone = request_body["phone"],
                                 description = request_body["description"],
                                 availability = request_body["availability"],
                                 people_id = people.id ) 
      db.session.add(volunteer)
      db.session.commit()
      response_body = {"message": "Adding volunteer",
                       "status": "ok",
                       "volunter_adding": id,         
                       }
      return response_body, 200
   if request.method == 'DELETE': 
      volunteer = db.get_or_404(Volunteer, id)
      db.session.delete(volunteer)
      db.session.commit()
      response_body = {"message": "DELETED volunteer",
                       "status": "ok",
                       "volunter_deleting": id,         
                       }
      return response_body, 200

@api.route('/experiences', methods=['POST', 'GET'])
def handle_experiences():
   if request.method == 'GET':
      # Realiza una unión (join) con la tabla "People" para obtener el nombre del usuario
      experiences = db.session.query(ExperiencesBlog, People).join(People).order_by(ExperiencesBlog.title).all()
      results = [
         {
               "id": exp[0].id,
               "title": exp[0].title,
               "body": exp[0].body,
               "photo": exp[0].photo,
               "name": exp[1].name  # Obtiene el nombre del usuario de la tabla "People"
         }
         for exp in experiences
      ]
      response_body = {
         "message": "Esto devuelve el endpoint de experiences el GET",
         "results": results,
         "status": "ok"
      }
      return response_body, 200
   if request.method =='POST':
      request_body = request.get_json()
      print(request_body)
      experiences = ExperiencesBlog (
                                     title = request_body["title"],
                                     body = request_body["body"],
                                     photo = request_body["photo"])
      db.session.add(experiences)
      db.session.commit()
      response_body = {
            "message": "Adding new experience",
            "status": "ok",
            "new_experience": request_body}
      # response_body = {"message": "Esto devuelve el POST del endpooint experiences"}
      return response_body, 200

@api.route('/experiences/<int:id>', methods=['GET', 'PUT', 'POST', 'DELETE'])
@jwt_required()
def handle_experience(id):
   if request.method == 'GET': 
      experience = db.get_or_404(ExperiencesBlog, id)
      print(experience)
      response_body = {
          "status": "ok",
          "results": experience.serialize()
      }
      return response_body, 200
   if request.method == 'POST':
        request_body = request.get_json()
        people = People.query.get(id)
        experiences = ExperiencesBlog (
                     title = request_body["title"],
                     body = request_body["body"],
                     photo = request_body["photo"],
                     people_id = people.id )

        db.session.add(experiences)
        db.session.commit()

        response_body = {"message": "Experience published successfully", "status": "ok"}
        return response_body, 200
   if request.method == 'PUT':
    request_body = request.get_json()
    experience = db.get_or_404(ExperiencesBlog, id)
    experience.title = request_body["title"]
    experience.body = request_body["body"]
    experience.photo = request_body["photo"]
    db.session.commit() 
    response_body = {"message" : "Update experience",
                     "status": "ok",
                     "experience": request_body
                    }
    return response_body, 200

   if request.method == 'DELETE':  
      experience = db.get_or_404(ExperiencesBlog, id)
      db.session.delete(experience)
      db.session.commit()
      response_body = {"message": "Delete experience",
                       "status": "ok",
                       "experience_deleting": id,
                       }
      return response_body, 200

   
@api.route('/reports', methods=['POST', 'GET'])
def handle_reports():
    if request.method =='GET':
        # response_body = {"message": "Esto devuelve el get del endpooint users"}
        reports = db.session.execute(db.select(Report).order_by(Report.id)).scalars()
        results =[item.serialize() for item in reports]
        response_body ={
            "message":"Esto devuelve el endpoint de userst el GET",
            "results": results,
            "status": "ok" }
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        user_id = request_body.get('user_id')  # Obtén el correo electrónico del usuario del cuerpo de la solicitud

        # Busca el usuario por user_id en la base de datos
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"message": "Missing user in request body"}), 400

        if user is None:
            return jsonify({"message": "User not found"}), 404

        report = Report(
            title=request_body['title'],
            body=request_body['body'],
            user_id=user.id  # Usa el id del usuario
        )

        db.session.add(report)
        db.session.commit()

        response_body = {
            "message": "Adding new report",
            "status": "ok",
            "new_report": request_body
        }

        return response_body, 200


@api.route('/reports/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_report(id):
  if request.method == 'GET': 
    report = db.get_or_404(Report, id) # De la base de datos user estoy obteniendo el id definido en el argumento de la funcion.
    print(report)
    response_body = {
        "status": "ok",
        "results": report.serialize()
    }
    return response_body, 200
  if request.method == 'PUT':
    request_body = request.get_json()
    report = db.get_or_404(Report, id)
    report.body = request_body["body"]
    report.title = request_body["title"]
    db.session.commit() 
    response_body = {"message": "Updated Report",
                     "status": "ok",
                     "user": request_body
                     }
    return response_body, 200
  if request.method == 'DELETE':  
    report = db.get_or_404(Report, id)
    db.session.delete(report) 
    db.session.commit()
    response_body = {"message": "DELETED report",
                     "status": "ok",
                     "report_deleting": id,
                     }
    return response_body, 200


@api.route('people', methods=['POST', 'GET'])
def handle_people():
   if request.method =='GET':
      # response_body = {"message": "Esto devuelve el get del endpooint people"}
      people = db.session.execute(db.select(People).order_by(People.name)).scalars()
      results = [item.serialize() for item in people]
      response_body = {
         "message":"Esto devuelve el endpoint de people el GET",
         "results": results,
         "status": "ok" }
      return response_body, 200
   if request.method =='POST':
      request_body = request.get_json()
      print(request_body)
      people = People (
                        name = request_body["name"],
                        lastname = request_body["lastname"],
                        trophy = request_body["trophy"] )
      db.session.add(people)
      db.session.commit()
      response_body = {
         "message": "Adding new people",
         "status": "ok",
         "new_people": request_body}
        # response_body = {"message": "Esto devuelve el POST del endpooint people"}
      return response_body, 200

@api.route('/people/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_person(id):
   if request.method == 'GET': 
      person = db.get_or404(People, id)
      print(person)
      response_body = {
         "status": "ok",
         "results": person.serializa()
      }
      return response_body, 200
   if request.method == 'PUT':
      request_body = request.get_json()
      person = db.get_or_404(People, id)
      person.name = request_body["name"]
      person.lastname = request_body["lastname"]
      person.trophy = request_body["trophy"]
      db.session.commit()
      response_body = {"message": "Updated person",
                       "status": "ok",
                       "person": request_body
                      }
      return response_body, 200
   if request.method == 'DELETE':  
      person = db.get_or_404(People, id)
      db.session.delete(person)
      db.session.commit()
      response_body = {"message": "DELETED person",
                       "status": "ok",
                       "person_deleting": id
                      }
      return response_body, 200

@api.route('/protectors', methods=['POST', 'GET'])
def handle_protectors():
    if request.method =='GET':
        # response_body = {"message": "Esto devuelve el get del endpooint protectors"}
        protectors = db.session.execute(db.select(AnimalShelter).order_by(AnimalShelter.name)).scalars()
        results =[item.serialize() for item in protectors]
        response_body ={
            "message":"Esto devuelve el endpoint de protectors el GET",
            "results": results,
            "status": "ok" }
        return response_body, 200
    if request.method =='POST':
        request_body = request.get_json()
        print(request_body)       
        protector = AnimalShelter (
                                    name = request_body["name"],
                                    address = request_body["address"],
                                    city = request_body["city"],
                                    zip_code = request_body["zip_code"],
                                    cif = request_body["cif"],
                                    web = request_body["web"],
                                    status_animal = request_body["status_animal"] )
        db.session.add(protector)       
        db.session.commit()
        response_body = {
            "message": "Adding new protector",
            "status": "ok",
            "new_protector": request_body }
        # response_body = {"message": "Esto devuelve el POST del endpooint protectors"}
        return response_body, 200

@api.route('/protectors/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def hanlde_protector(id):
   if request.method == 'GET': 
      protector = db.get_or_404(AnimalShelter, id)
      print(protector)
      response_body = {
         "status": "ok",
         "results": protector.serialize()
      }
      return response_body, 200
   if request.method == 'PUT':
      request_body = request.get_json()
      protector = db.get_or_404(AnimalShelter, id)
      protector.name = request_body["name"]
      protector.address = request_body["address"]
      protector.city = request_body["city"]
      protector.zip_code = request_body["zip_code"]
      protector.cif = request_body["cif"]
      protector.web = request_body["web"]
      protector.status_animal = request_body["status_animal"]
      db.session.commit() 
      response_body = {"message": "Update protector",
                       "status": "ok",
                       "protector": request_body
                      }
      return response_body, 200
   if request.method == 'DELETE':  
      protector = db.get_or_404(AnimalShelter, id)
      db.session.delete(protector)
      db.session.commit()
      response_body = {"message": "DELETED protector",
                       "status": "ok",
                       "protector_deleting": id
                       }
      return response_body, 200

@api.route('/tips',methods=['POST', 'GET'])
def handle_tips():
   if request.method =='GET':
        # response_body = {"message": "Esto devuelve el get del endpooint tips"}
        tips = db.session.execute(db.select(TipsPets).order_by(TipsPets.title)).scalars()
        results =[item.serialize() for item in tips]
        response_body = {
           "message":"Esto devuelve el endpoint de tips el GET",
           "results": results,
           "status": "ok" }
        return response_body, 200
   if request.method =='POST':
      request_body = request.get_json()
      print(request_body)
      tip = TipsPets (
                      title = request_body["title"],
                      body = request_body["body"])
      db.session.add(tip)
      db.session.commit()
      response_body = {
         "message": "Adding new tip",
         "status": "ok",
         "new_tip": request_body }
      # response_body = {"message": "Esto devuelve el POST del endpooint users"}
      return response_body, 200

@api.route('/tips/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_tip(id):
   if request.method == 'GET': 
      tip = db.get_or_404(TipsPets, id)
      print(tip)
      response_body = {
         "status": "ok",
         "results": tip.serialize()
      }
      return response_body, 200
   if request.method == 'PUT':
    request_body = request.get_json()
    tip = db.get_or_404(TipsPets, id)
    tip.title = request_body["title"]
    tip.body = request_body["body"]
    db.session.commit() 
    response_body = {"message": "Update tip",
                     "status": "ok",
                     "tip": request_body
                    }
    return response_body, 200
   if request.method == 'DELETE': 
      tip = db.get_or_404(TipsPets, id) 
      db.session.delete(tip)
      db.session.commit()
      response_body = {"message": "DELETED tip",
                       "status": "ok",
                       "tip_deleting": id  }
      return response_body, 200
   
@api.route('animals', methods=['POST', 'GET'])
def handle_animals():
   if request.method =='GET':
        # response_body = {"message": "Esto devuelve el get del endpooint animals"}
        animals = db.session.execute(db.select(Animal).order_by(Animal.name)).scalars()
        results = [item.serialize() for item in animals]
        response_body = {
           "message":"Esto devuelve el endpoint de animals el GET",
           "results": results,
           "status": "ok"  }
        return response_body, 200
   if request.method =='POST':
      request_body = request.get_json()
      print(request_body)

      # Verifica si ya existe un animal con las mismas características
      existing_animal = Animal.query.filter_by(
         name=request_body["name"],
         color=request_body["color"],
         size=request_body["size"],
         user_id=request_body["user_id"]
      ).first()

      if existing_animal:
         response_body = {
            "message": "Este animal ya ha sido registrado por el usuario",
            "status": "error"
         }
         return response_body, 400

      animal = Animal (
         name = request_body["name"],
         city = request_body["city"],
         phone = request_body["phone"],
         size = request_body["size"],
         color = request_body["color"],
         type_of_animal = request_body["type_of_animal"],
         description = request_body["description"],
         animal_status = request_body["animal_status"],
         date = request_body["date"],
         contact = request_body["contact"],
         photo = request_body["photo"],
         is_active = request_body["is_active"],
         user_id = request_body["user_id"]  )
      db.session.add(animal)
      db.session.commit()
      response_body = {
         "message": "Adding new animal",
         "status": "ok",
         "new_animal": request_body }
      # response_body = {"message": "Esto devuelve el POST del endpooint animals"}
      return response_body, 200

@api.route('/animals/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_animal(id):
   if request.method == 'GET': 
      animal = db.get_or_404(Animal, id)
      print(animal)
      response_body = {
         "status": "ok",
         "results": animal.serialize()
      }
      return response_body, 200
   if request.method == 'PUT':
    request_body = request.get_json()
    animal = db.get_or_404(Animal, id)
    animal.name = request_body["name"]
    animal.city = request_body["city"]
    animal.phone = request_body["phone"]
    animal.size = request_body["size"]
    animal.color = request_body["color"]
    animal.type_of_animal = request_body["type_of_animal"]
    animal.description = request_body["description"]
    animal.animal_lost = request_body["animal_lost"]
    animal.date = request_body["date"]
    animal.contact = request_body["contact"]
    animal.photo = request_body["photo"]
    animal.is_active = request_body["is_active"]
    db.session.commit()
    response_body = {"message": "Update animal",
                     "status":"ok",
                     "animal": request_body
                     }
    return response_body, 200
   if request.method == 'DELETE':  
      animal = db.get_or_404(Animal, id)
      db.session.delete(animal)
      db.session.commit()
      response_body = {"message": "DELETED animal",
                     "status":"ok",
                     "animal_deleting": id
                      }
      return response_body, 200


@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    # Consulta la base de datos para verificar las credenciales del usuario
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    # Obtén el user_id del usuario autenticado
    user_id = user.id

    # Determina el rol del usuario (por ejemplo, a partir de un campo 'role' en la tabla User)
    user_role = user.role

    # Inicializa variables para los IDs de tablas correspondientes a cada rol
    people_id = None
    animalshelter_id = None

    # Asigna los IDs de tablas según el rol del usuario
    if user_role == 'Person':
        # Consulta la base de datos para obtener el People relacionado con el user_id
        people = People.query.filter_by(user_id=user_id).first()
        if people:
            people_id = people.id

    elif user_role == 'AnimalShelter':
        # Consulta la base de datos para obtener el AnimalShelter relacionado con el user_id
        animalshelter = AnimalShelter.query.filter_by(user_id=user_id).first()
        if animalshelter:
            animalshelter_id = animalshelter.id

    # Consulta la base de datos para obtener la experiencia del usuario (si existe)
    experience = ExperiencesBlog.query.filter_by(people_id=people_id).first() if people_id else None
    experience_id = experience.id if experience else None

    # Crear el token de acceso y agregar 'user_id' y 'people_id' al contenido del token según el rol
    additional_claims = {"user_id": user_id}
    if user_role != 'Admin':
        # Si el usuario no tiene el rol "Admin", agrega el ID correspondiente al rol
        if people_id:
            additional_claims["people_id"] = people_id
        elif animalshelter_id:
            additional_claims["animalshelter_id"] = animalshelter_id

    access_token = create_access_token(identity=user.id, additional_claims=additional_claims)

    # Incluir información del usuario en la respuesta, incluyendo 'user_id' y el ID correspondiente al rol
    user_info = {
        "access_token": access_token,
        "user_id": user.id,
        "user_email": user.email,
        "user_role": user_role,
        "user_id": user_id,
        "people_id": people_id,
        "animalshelter_id": animalshelter_id,
        "experience_id": experience_id
    }
    return jsonify(user_info)






