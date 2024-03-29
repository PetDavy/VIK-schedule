from flask import jsonify


def template(data, code):
    return {
        'errors': {
            'messages': data,
        },
        'status_code': code,
    }


USER_NOT_FOUND = template(data=['User not found'], code=400)
USER_ALREADY_EXISTS = template(data=['User already exists'], code=400)
EMPTY_FIELD = template(data=['Empty field'], code=422)
INVALID_FIELDS = template(data=['Invalid field'], code=422)


class InvalidUsage(Exception):
    status_code = 500

    def __init__(self, errors, status_code=None, payload=None):
        Exception.__init__(self)
        self.errors = errors
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_json(self):
        errors = self.errors
        payload = dict(self.payload or ())
        return jsonify({**errors, **payload})

    @classmethod
    def user_not_found(cls):
        return cls(**USER_NOT_FOUND)

    @classmethod
    def user_already_exists(cls):
        return cls(**USER_ALREADY_EXISTS)


class InvalidValue(InvalidUsage):
    @classmethod
    def empty_fields(cls, fields):
        return cls(**EMPTY_FIELD, payload={'fields': fields})

    @classmethod
    def invalid_fields(cls, fields):
        return cls(**INVALID_FIELDS, payload={'fields': fields})
