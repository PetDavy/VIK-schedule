from marshmallow import Schema, fields, validate, post_dump


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Email(validate=validate.Email())
    password = fields.Str(load_only=True)
    new_password = fields.Str(load_only=True)
    created_at = fields.DateTime(dump_only=True)
    picture = fields.Str()
    is_google_auth = fields.Boolean()
    token = fields.Str(dump_only=True)

    new_password = fields.Str(load_only=True)
    message = fields.Str(dump_only=True)

    @post_dump
    def dump_user(self, data, **kwargs):
        message = data.get('message', None)
        if message is not None:
            return data

        return data


user_schema = UserSchema()
users_schema = UserSchema(many=True)
