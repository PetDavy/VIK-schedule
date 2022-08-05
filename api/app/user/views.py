from flask import Blueprint, jsonify
from flask_apispec import use_kwargs, marshal_with
from flask_jwt_extended import jwt_required, create_access_token

from .models import User
from .serializers import user_schema

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/user/login', methods=('POST',))
@jwt_required(optional=True)
@use_kwargs(user_schema)
@marshal_with(user_schema)
def login(email, password, **kwargs):
    user = User.query.filter_by(email=email).first()

    if user is not None and user.check_password(password):
        user.token = create_access_token(user)

        return user


@blueprint.route('/api/user/register', methods=('POST',))
@use_kwargs(user_schema)
@marshal_with(user_schema)
def register(username, email, password, **kwargs):
    user = User(username=username, email=email, password=password)
    user.token = create_access_token(user)
    user.save()
    return user


@blueprint.route('/api/users', methods=('GET',))
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
