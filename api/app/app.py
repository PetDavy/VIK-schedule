from flask import Flask
from app import user, students, studentProfile, classesTable

from app.extentions import db
from app.extentions import migrate
from app.extentions import jwt
from app.extentions import cors


def create_app(config_object):
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_blueprints(app)
    register_extensions(app)
    jwt.init_app(app)

    return app


def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)


def register_blueprints(app):
    origins = app.config.get('CORS_ORIGIN_WHITELIST', '*')
    cors.init_app(user.views.blueprint, origins=origins)
    cors.init_app(students.views.blueprint, origins=origins)
    cors.init_app(studentProfile.views.blueprint, origins=origins)
    cors.init_app(classesTable.views.blueprint, origins=origins)

    app.register_blueprint(user.views.blueprint)
    app.register_blueprint(students.views.blueprint)
    app.register_blueprint(studentProfile.views.blueprint)
    app.register_blueprint(classesTable.views.blueprint)
