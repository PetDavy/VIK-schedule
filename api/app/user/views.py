from flask import Blueprint, jsonify
from flask_apispec import use_kwargs, marshal_with

from .models import User
from .serializers import user_schema

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/user/login', methods=('POST',))
@use_kwargs(user_schema)
def login(email, password, **kwargs):
    if email == 'admin@gmail.com' and password == 'admin':
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed'})


@blueprint.route('/api/user/register', methods=('POST',))
@use_kwargs(user_schema)
@marshal_with(user_schema)
def register(username, email, password, **kwargs):
    user = User(username=username, email=email, password=password)
    user.save()
    return user


@blueprint.route('/api/users', methods=('GET',))
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
