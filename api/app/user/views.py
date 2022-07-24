from flask import Blueprint, jsonify
from marshmallow import fields
from flask_apispec import use_kwargs
from .models import User

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/user/login', methods=('POST',))
@use_kwargs({
    'email': fields.Email(required=True),
    'password': fields.String(required=True)
})
def login(email, password, **kwargs):
    if email == 'admin@gmail.com' and password == 'admin':
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed'})


@blueprint.route('/api/users', methods=('GET',))
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])
