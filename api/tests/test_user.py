from flask import url_for


def _register_user(client):
    user = {
        'username': 'tester',
        'email': 'test@email.com',
        'password': 'password'
    }

    return client.post(url_for('user.register'), json=user)


def _login_user(client):
    user = {'email': 'test@email.com', 'password': 'password'}
    return client.post(url_for('user.login'), json=user)


class TestUser:
    def test_register(self, client):
        response = _register_user(client)
        assert response.status_code == 200
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
            'password': 'password',
            'new_password': 'new_password'
        }, headers={'Authorization': f'Bearer {user.json["token"]}'})
        assert response.status_code == 200
        assert response.json['username'] == 'tester'
