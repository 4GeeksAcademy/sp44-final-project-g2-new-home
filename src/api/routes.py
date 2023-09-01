"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rating 
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
    else:
        total_rating_value = sum(rating.rating for rating in all_ratings)
        vote_count = total_ratings
        sum_total_votes = total_rating_value
    
    # Actualiza los campos en la tabla "Rating"
    Rating.query.filter_by(rated_id=user_id).update({
        'vote_count': vote_count,
        'sum_total_votes': sum_total_votes
    })
    
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


