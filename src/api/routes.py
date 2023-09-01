"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Volunteer, ExperiencesBlog
from api.utils import generate_sitemap, APIException

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
        users = db.session.execute(db.select(User).order_by(User.name)).scalars()
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
                    role = request_body['role']                )
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