  
import os
from flask_admin import Admin
from .models import db, User, Rating
from flask_admin.contrib.sqla import ModelView

class CustomUsersModelView(ModelView):
    column_list = ['id', 'email', 'is_active', 'role', 'rating']

class CustomRatingModelView(ModelView):
    column_list = ['rating']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(CustomUsersModelView(User, db.session))
    admin.add_view(CustomRatingModelView(Rating, db.session))
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
