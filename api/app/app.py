from flask import Flask
from app import user


def create_app(config_object):
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_blueprints(app)

    return app


def register_blueprints(app):
    app.register_blueprint(user.views.blueprint)
