"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Volunteer, ExperiencesBlog, Rating, Report
from api.utils import generate_sitemap, APIException
from sqlalchemy import func

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


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
        user = User(                                     #Creamos una instancia de user
                    email = request_body["email"],
                    password = request_body['password'],
                    is_active = request_body['is_active'],
                    role = request_body['role'])
        db.session.add(user)
        db.session.commit()
        response_body = {
            "message": "Adding new user",
            "status": "ok",
            "new_user": request_body}
        # response_body = {"message": "Esto devuelve el POST del endpooint users"}
        return response_body, 200


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
  if request.method == 'GET': 
    user = db.get_or_404(User, id) # De la base de datos user estoy obteniendo el id definido en el argumento de la funcion.
    print(user)
    response_body = {
        "status": "ok",
        "results": user.serialize()
    }
    return response_body, 200
  if request.method == 'PUT':
    request_body = request.get_json()
    user = db.get_or_404(User, id)
    user.email = request_body["email"]
    user.password = request_body["password"]
    db.session.commit() 
    response_body = {"message": "Updated user",
                     "status": "ok",
                     "user": request_body
                     }
    return response_body, 200
  if request.method == 'DELETE':  
    user = db.get_or_404(User, id)
    db.session.delete(user) 
    db.session.commit()
    response_body = {"message": "DELETED user",
                     "status": "ok",
                     "user_deleting": id,
                     }
    return response_body, 200


def update_vote_stats(user_id):
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
    update_vote_stats(rated_id)

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
         address = request_body["address"],
         city = request_body["city"],
         zip_code = request_body["zip_code"],
         phone = request_body["phone"],
         email = request_body["email"],
         description = request_body["description"],
         availability = request_body["availability"])
      db.session.add(volunteer)
      db.session.commit()
      response_body = {
         "message": "adding new volunteer",
         "status": "ok",
         "new_volunteer": request_body}
      # response_body = {"message": "Esto devuelve el POST del endpooint volunteers"}
      return response_body, 200
   
@api.route('/volunteers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
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
      volunteer = db.get_or_404(Volunteer, id)
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
                       "volunteer": request_body
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
   if request.method =='GET':
      # response_body = {"message": "Esto devuelve el get del endpooint experiences"}
      experiences = db.session.execute(db.select(ExperiencesBlog).order_by(ExperiencesBlog.title)).scalars()
      results = [item.serialize() for item in experiences]
      response_body ={
            "message":"Esto devuelve el endpoint de experiences el GET",
            "results": results,
            "status": "ok" }
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

@api.route('/experiences/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_experience(id):
   if request.method == 'GET': 
      experience = db.get_or_404(ExperiencesBlog, id)
      print(experience)
      response_body = {
          "status": "ok",
          "results": experience.serialize()
      }
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

