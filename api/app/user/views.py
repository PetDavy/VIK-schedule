import os

import google.auth.transport.requests
from flask import Blueprint, request, jsonify, redirect
from flask_apispec import use_kwargs, marshal_with
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from google.oauth2 import id_token

from .models import User
from .serializers import user_schema, user_update_schema
from app.extentions import flow
from app.exeptions import InvalidUsage

blueprint = Blueprint('user', __name__)


@blueprint.route('/login/google', methods=['GET'])
def login_google():
    authorization_url, state = flow.authorization_url()
    return jsonify({'authUrl': authorization_url})


@blueprint.route('/callback', methods=['GET'])
def login_google_callback():
    flow.fetch_token(authorization_response=request.url)

    credentials = flow.credentials

    id_info = id_token.verify_oauth2_token(
        credentials._id_token,
        google.auth.transport.requests.Request(),
        credentials._client_id
    )

    user = User.query.filter_by(email=id_info['email']).first()

    if not user:
        user = User(
            email=id_info['email'],
            username=id_info['name'],
            picture=id_info['picture'],
            is_google_auth=True
        )
        user.save()

    user.token = create_access_token(user)
    return redirect(f'{os.environ.get("CLIENT_ROOT", "localhost")}/login?token={user.token}') # noqa


@blueprint.route('/api/user/login', methods=('POST',))
@jwt_required(optional=True)
@use_kwargs(user_schema)
@marshal_with(user_schema)
def login(email, password, **kwargs):
    user = User.query.filter_by(email=email).first()

    if user is not None and user.check_password(password):
        user.token = create_access_token(user)

        return user
    else:
        raise InvalidUsage.user_not_found()


@blueprint.route('/api/user/register', methods=('POST',))
@use_kwargs(user_schema)
@marshal_with(user_schema)
def register(username, email, password, **kwargs):
    user = User.query.filter_by(email=email).first()

    if user is not None:
        raise InvalidUsage.user_already_exists()
    else:
        user = User(username=username, email=email, password=password, **kwargs) # noqa
        user.save()
        user.token = create_access_token(user)
        return user, 201


@blueprint.route('/api/user', methods=('GET',))
@jwt_required()
@marshal_with(user_schema)
def get_user():
    return current_user


@blueprint.route('/api/user/update', methods=('PUT',))
@jwt_required()
@use_kwargs(user_update_schema)
@marshal_with(user_update_schema)
def update_user(**kwargs):
    password = kwargs.pop('password', None)
    new_password = kwargs.pop('new_password', None)
    if password is not None:
        current_user.set_password(new_password)

    current_user.update(**kwargs)
    return current_user
