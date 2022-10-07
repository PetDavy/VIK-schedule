from flask import url_for


def _register_user(client):
    user = {
        'username': 'User Studentkeeper',
        'email': 'userstudentkeeper@email.com',
        'password': 'password_12345_PASSWORD'
    }

    return client.post(url_for('user.register'), json=user)


def _login_user(client):
    user = {'email': 'userstudentkeeper@email.com', 'password': 'password_12345_PASSWORD'} # noqa
    return client.post(url_for('user.login'), json=user)


def get_students_data():
    return [
        {'name': 'Student 1', 'age': 10, 'info': 'Info 1'},
        {'name': 'Student 2', 'age': 11, 'info': 'Info 2'},
        {'name': 'Student 3', 'age': 12, 'info': 'Info 3'},
    ]


class TestStudents:
    def test_create_student(self, client):
        _register_user(client)
        user = _login_user(client)
        students_data = get_students_data()

        for student_data in students_data:
            response = client.post(
                url_for('students.create_student'),
                json=student_data,
                headers={'Authorization': 'Bearer {}'.format(user.json['token'])} # noqa
            )
            assert response.status_code == 201
            assert response.json['name'] == student_data['name']
            assert response.json['age'] == student_data['age']
            assert response.json['info'] == student_data['info']

    def test_get_students(self, client):
        _register_user(client)
        user = _login_user(client)
        students_data = get_students_data()

        response = client.get(
            url_for('students.get_students'),
            headers={'Authorization': 'Bearer {}'.format(user.json['token'])}
        )
        assert response.status_code == 200
        assert len(response.json) == 3
        assert response.json[0]['id'] == 1
        assert response.json[0]['name'] == students_data[0]['name']
        assert response.json[0]['age'] == students_data[0]['age']
        assert response.json[0]['info'] == students_data[0]['info']
        assert len(response.json[0]['profiles']) == 1
        assert response.json[0]['profiles'][0]['student_id'] == 1 # noqa
