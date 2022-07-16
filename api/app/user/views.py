from flask import Blueprint, request, jsonify

blueprint = Blueprint('user', __name__)


@blueprint.route('/api/login', methods=('POST',))
def login():
    email = request.form['email']
    password = request.form['password']
    if email == 'admin@gmail.com' and password == 'admin':
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed'})
