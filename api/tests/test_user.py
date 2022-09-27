from flask import url_for


def _register_user(client):
    user = {
        'username': 'tester',
        'email': 'test@email.com',
        'password': 'password_12345_PASSWORD'
    }

    return client.post(url_for('user.register'), json=user)


def _login_user(client):
    user = {'email': 'test@email.com', 'password': 'password_12345_PASSWORD'}
    return client.post(url_for('user.login'), json=user)


class TestUser:
    def test_register(self, client):
        response = _register_user(client)
        assert response.status_code == 201
        assert response.json['username'] == 'tester'
        assert response.json['email'] == 'test@email.com'
        assert response.json['token'] is not None
        assert response.json['is_google_auth'] is False

    def test_login(self, client):
        response = _login_user(client)
        assert response.status_code == 200
        assert response.json['username'] == 'tester'
        assert response.json['email'] == 'test@email.com'
        assert response.json['token'] is not None
        assert response.json['is_google_auth'] is False

    def test_get_user(self, client):
        user = _login_user(client)
        response = client.get(url_for('user.get_user'), headers={
            'Authorization': f'Bearer {user.json["token"]}'
        })
        assert response.status_code == 200
        assert response.json['username'] == 'tester'
        assert response.json['email'] == 'test@email.com'
        assert response.json['token'] == ''
        assert response.json['is_google_auth'] is False

    def test_change_password(self, client):
        user = _login_user(client)
        response = client.put(url_for('user.update_user'), json={
            'password': 'password_12345_PASSWORD',
            'new_password': 'new_password_12345_PASSWORD'
        }, headers={'Authorization': f'Bearer {user.json["token"]}'})
        assert response.status_code == 200
        assert response.json['username'] == 'tester'

    # VALIDATION TESTS
    def test_register_with_invalid_email(self, client):
        user = {
            'username': 'tester',
            'email': 'another',
            'password': 'password_12345_PASSWORD'
        }
        response = client.post(url_for('user.register'), json=user)
        assert response.status_code == 422
        assert 'Invalid field' in response.json['errors']
        assert 'email' in response.json['fields']

    def test_register_with_invalid_password(self, client):
        user = {
            'username': 'tester',
            'email': 'another@gmail.com',
            'password': 'password'
        }
        response = client.post(url_for('user.register'), json=user)
        assert response.status_code == 422
        assert 'Invalid field' in response.json['errors']
        assert 'password' in response.json['fields']

    def test_register_with_empty_fields(self, client):
        user = {
            'username': '',
            'email': '',
            'password': ''
        }
        response = client.post(url_for('user.register'), json=user)
        assert response.status_code == 422
        assert 'Empty field' in response.json['errors']
        assert len(response.json['fields']) == 3

    def test_login_with_no_email(self, client):
        user = {'password': 'password_12345_PASSWORD', 'email': ''}
        response = client.post(url_for('user.login'), json=user)
        assert response.status_code == 422
        assert 'Empty field' in response.json['errors']
        assert 'email' in response.json['fields']

    def test_login_with_no_password(self, client):
        user = {'email': 'test@email.com', 'password': ''}
        response = client.post(url_for('user.login'), json=user)
        assert response.status_code == 422
        assert 'Empty field' in response.json['errors']
        assert 'password' in response.json['fields']
