from flask import jsonify


def template(data, code):
    return {
        'message': {
            'errors': data,
        },
        'status_code': code
    }


USER_NOT_FOUND = template(data=['User not found'], code=400)


class InvalidUsage(Exception):
    status_code = 500

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_json(self):
        rv = self.message
        return jsonify(rv)

    @ classmethod
    def user_not_found(cls):
        return cls(**USER_NOT_FOUND)
