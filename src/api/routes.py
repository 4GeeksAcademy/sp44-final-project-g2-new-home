"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
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


# @api.route('/ratings', methods=['POST'])
# def handle_ratings():
#     request_body = request.get_json()
    
#     rater_id = request_body.get('user_id')
#     rated_id = request_body.get('user_id')
#     rating_value = request_body.get('rating')
    
#     if rater_id is None or rated_id is None or rating_value is None:
#         return jsonify({"message": "Invalid request body"}), 400
    
#     # Verifica si los usuarios existen y son de los tipos adecuados----
#     # Obtén los usuarios por sus IDs
#     rater = User.query.get_or_404(rater_id)
#     rated = User.query.get_or_404(rated_id)

#     # Verifica que los roles sean los adecuados
#     allowed_roles = ['Person', 'AnimalShelter']
#     if rater.role not in allowed_roles or rated.role not in allowed_roles:
#         return jsonify({"message": "Invalid user roles"}), 400

    
#     # Valida que el rater y el rated tengan roles coincidentes
#     if rater.role != rated.role:
#         return jsonify({"message": "Rater and rated must have the same role"}), 400
    
#     # Validar que el rater no esté votando a sí mismo
#     if rater_id == rated_id:
#         return jsonify({"message": "Users cannot rate themselves"}), 400
    
#     # Validar que el valor de la valoración esté entre 1 y 5
#     if not (1 <= rating_value <= 5):
#         return jsonify({"message": "Rating value must be between 1 and 5"}), 400
    
#     new_rating = Rating(rater_id=rater_id, rated_id=rated_id, rating=rating_value)
    
#     db.session.add(new_rating)
#     db.session.commit()
    
#     response_body = {
#         "message": "Rating added successfully",
#         "status": "ok",
#         "new_rating": new_rating.serialize()
#     }
    
#     return response_body, 201


