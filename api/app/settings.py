import os
from datetime import timedelta


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
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    FLASK_DEBUG = True  # Do not use debug mode in production
    # Google variables
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
    CORS_ORIGIN_WHITELIST = [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
