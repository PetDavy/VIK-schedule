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
        {'name': 'Student 1', 'age': 10, 'info': 'Info 1', 'contact': 'student1@gmail.com'}, # noqa
        {'name': 'Student 2', 'age': 11, 'info': 'Info 2', 'contact': 'student2@gmail.com'}, # noqa
        {'name': 'Student 3', 'age': 12, 'info': 'Info 3', 'contact': 'student3@gmail.com'}, # noqa
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
            assert response.json['contact'] == student_data['contact']

    def test_get_students(self, client):
        user = _login_user(client)
        students_data = get_students_data()

        response = client.get(
            url_for('students.get_students'),
            headers={'Authorization': 'Bearer {}'.format(user.json['token'])}
        )
        assert response.status_code == 200
        assert len(response.json) == 3

        for i, student_data in enumerate(students_data):
            assert student_data['name'] == response.json[i]['name']
            assert student_data['age'] == response.json[i]['age']
            assert student_data['info'] == response.json[i]['info']
            assert student_data['contact'] == response.json[i]['contact']

            assert len(response.json[i]['profiles']) == 1
            assert response.json[i]['profiles'][0]['student_id'] == i + 1 # noqa

    def test_update_student(self, client):
        user = _login_user(client)

        response = client.put(
            url_for('students.update_student'),
            json={'id': 1, 'name': 'Updated Student 1'},
            headers={'Authorization': 'Bearer {}'.format(user.json['token'])} # noqa
        )

        assert response.status_code == 200
        assert response.json['name'] == 'Updated Student 1'
