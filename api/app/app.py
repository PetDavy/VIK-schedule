from flask import Flask
from app import user

from app.extentions import db
from app.extentions import migrate


def create_app(config_object):
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_blueprints(app)
    register_extensions(app)

    return app


def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)


def register_blueprints(app):
    app.register_blueprint(user.views.blueprint)
