from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import DateTime
from sqlalchemy.orm import validates


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    role = db.Column(db.Enum('Admin', 'AnimalShelter', 'Person', name='role'), nullable=False)
    calculated_rating = db.Column(db.Float(precision=2), default=None)
    sum_total_votes = db.Column(db.Integer)
    vote_count = db.Column(db.Integer)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "role":self.role,
            "calculated_rating": self.calculated_rating,
            "vote_count": self.vote_count,
            "sum_total_votes": self.sum_total_votes
            # do not serialize the password, its a security breach
        }


class People(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    lastname = db.Column(db.String(20), nullable=False)
    trophy = db. Column(db.Boolean())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    user = db.relationship('User')

    def __repr__(self):
        return f'<People {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "trophy": self.trophy,
            "user_id": self.user_id
        }
    

class AnimalShelter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=False, nullable=False)
    address = db.Column(db.String(80))
    city = db.Column(db.String(30), nullable=False)
    zip_code = db.Column(db.String(15), nullable=False)
    cif = db.Column(db.String(20), nullable=False)
    web = db.Column(db.String(100),  nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    user = db.relationship('User')

    def __repr__(self):
        return f'<AnimalShelter {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "zip_code": self.zip_code,
            "cif": self.cif,
            "web": self.web,
            "user_id": self.user_id
        }



class Volunteer(db.Model):
    id = db.Column(db.Integer, primary_key=True)    
    address = db.Column(db.String(80))
    city = db.Column(db.String(120), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    availability = db.Column(db.Enum('Morning', 'Afternoon', name='availability'), nullable=False)
    people_id = db.Column(db.Integer, db.ForeignKey('people.id'), unique=True)
    user = db.relationship('People')

    def __repr__(self):
        return f'<Volunteer {self.email}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "city": self.city,
            "zip_code": self.zip_code,
            "phone": self.phone,
            "email": self.email,
            "description": self.description,
            "availability": self.availability,
        }


class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)   
    rating = db.Column(db.Integer)
    rater_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rater = db.relationship('User', foreign_keys=[rater_id])
    rated_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rated = db.relationship('User', foreign_keys=[rated_id])

    @validates('rating')
    def validate_rating(self, key, rating):
        if not (1 <= rating <= 5):
            raise ValueError("Rating value must be between 1 and 5")
        return rating

    def __repr__(self):
        return f'<Rating {self.rating}>'
    
    def serialize(self):
        return {
            "rating": self.rating,
            "rater":self.rater_id,      
            "rated":self.rated_id,
        }
    

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Enum('Report inappropriate attitude', 'Report inaccurate or inappropriate content', 'Report an animal shelter', 'Report abuse of a pet', 'Others', name='tittle'), nullable=False)
    body = db.Column(db.String(1000), unique=False, nullable=False)
    user_id =  db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

    def __repr__(self):
        return f'<Report {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "user_id": self.user_id
        }


class TipsPets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    body = db.Column(db.String(1000), unique=False, nullable=False)
    user_id =  db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

    def __repr__(self):
        return f'<Report {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "user_id": self.user_id
        }
    


class Animal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=False, nullable=False)
    city = db.Column(db.String(80), unique=False, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    size = db.Column(db.Enum('Large', 'Medium', 'Small', name='size'), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    type_of_animal = db.Column(db.Enum('Dog', 'Cat', name='type_of_animal'), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    animal_status = db.Column(db.Enum('Lost', 'Found', 'Adoption', name='animal_status'), nullable=False)
    gender = db.Column(db.Enum('Female', 'Male', name='gender'), nullable=False)
    age = db.Column(db.Enum('Baby', 'Young', 'Adult', 'Senior', name='age'), nullable=False)
    mixture = db.Column(db.String(30), nullable=False)
    date = db.Column(DateTime, default=datetime.utcnow, nullable=True)
    contact = db.Column(db.String(1000),  nullable=False)
    photo = db.Column(db.String(1250), nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    user_id =  db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "city": self.city,
            "phone": self.phone,
            "size": self.size,
            "color": self.color,
            "type_of_animal": self.type_of_animal,
            "description": self.description,
            "photo": self.photo,
            "is_active": self.is_active,
            "date":self.date,
            "contact": self.contact,
            "animal_status": self.animal_status,
            "gender": self.gender,
            "age":self.age,
            "mixture":self.mixture,
            "user_id": self.user_id,
            # "date": self.post_date.isoformat()
        }
    

class ExperiencesBlog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    body = db.Column(db.String(1000), unique=False, nullable=False)
    photo = db.Column(db.String(1250), unique=False, nullable=True)
    people_id = db.Column(db.Integer, db.ForeignKey('people.id'), unique=True)
    user = db.relationship('People')

    def __repr__(self):
        return f'<Report {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "photo": self.photo,
            "people_id": self.people_id
        }