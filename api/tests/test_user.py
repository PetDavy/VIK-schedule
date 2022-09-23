from flask import url_for


def _register_user(client):
    user = {
        'username': 'tester',
        'email': 'test@email.com',
        'password': 'password'
    }

    return client.post(url_for('user.register'), json=user)


class TestUser:
    def test_register(self, client):
        response = _register_user(client)
        assert response.status_code == 201
