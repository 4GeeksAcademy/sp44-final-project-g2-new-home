import os
from flask_admin import Admin
from .models import db, User, Rating, Report, ExperiencesBlog, Volunteer, People, AnimalShelter, TipsPets, Animal
from flask_admin.contrib.sqla import ModelView

class CustomUsersModelView(ModelView):
    column_list = ['id', 'email', 'is_active', 'role', 'sum_total_votes', 'vote_count', 'calculated_rating']

# class CustomPeopleModelView(ModelView):
#     column_list = ['user', 'id', 'name', 'lastname', 'trophy']

class CustomRatingModelView(ModelView):
    column_list = ['rater', 'rated', 'rating']

class CustomExperiencesModelView(ModelView):
    column_list = ['user', 'id', 'title', 'body', 'photo']

class CustomReportModelView(ModelView):
    column_list = ['id', 'user_id', 'title', 'body']

class CustomAnimalModelView(ModelView):
    column_list = ['id', 'user', 'name', 'city', 'phone', 'size', 'color', 'type_of_animal', 'description', 'animal_status', 'date', 'contact', 'photo', 'is_active']

class CustomPeopleModelView(ModelView):
    column_list = ['id', 'name', 'lastname', 'trophy']

class CustomVolunteersModelView(ModelView):
    column_list = ['user', 'id', 'address', 'city', 'zip_code', 'phone', 'email', 'description', 'availability']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(CustomUsersModelView(User, db.session))
    admin.add_view(CustomRatingModelView(Rating, db.session))
    admin.add_view(CustomReportModelView(Report, db.session))
    admin.add_view(CustomExperiencesModelView(ExperiencesBlog, db.session))
    admin.add_view(ModelView(AnimalShelter, db.session))
    admin.add_view(ModelView(People, db.session))
    admin.add_view(ModelView(TipsPets, db.session))
    admin.add_view(CustomAnimalModelView(Animal, db.session))
    # admin.add_view(CustomPeopleModelView(People, db.session))
    admin.add_view(CustomVolunteersModelView(Volunteer, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))