import os


class Config:
    '''Base settings'''

    # Flask settings
    SECRET_KEY = 'something secret'  # Change this!
    FLASK_ENV = 'development'
    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'something secret'  # Change this!
    FLASK_DEBUG = True  # Do not use debug mode in production
