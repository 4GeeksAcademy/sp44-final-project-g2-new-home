import os
from flask_admin import Admin
from .models import db, User, Rating, Report, ExperiencesBlog, Volunteer, People, AnimalShelter, TipsPets, Animal
from flask_admin.contrib.sqla import ModelView

class CustomUsersModelView(ModelView):
    column_list = ['id', 'email', 'is_active', 'role', 'sum_total_votes', 'vote_count', 'calculated_rating']

class CustomRatingModelView(ModelView):
    column_list = ['rater', 'rated', 'rating']

class CustomReportModelView(ModelView):
    column_list = ['id', 'user_id', 'title', 'body']

# class CustomAnimalModelView(ModelView):
#     column_list = ['name', 'city', 'rating']

class CustomPeopleModelView(ModelView):
    column_list = ['id', 'name', 'lastname', 'trophy']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(CustomUsersModelView(User, db.session))
    admin.add_view(CustomRatingModelView(Rating, db.session))
    admin.add_view(CustomReportModelView(Report, db.session))
    admin.add_view(ModelView(Volunteer, db.session))
    admin.add_view(ModelView(ExperiencesBlog, db.session))
    admin.add_view(ModelView(AnimalShelter, db.session))
    admin.add_view(ModelView(TipsPets, db.session))
    admin.add_view(ModelView(Animal, db.session))
    admin.add_view(CustomPeopleModelView(People, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))