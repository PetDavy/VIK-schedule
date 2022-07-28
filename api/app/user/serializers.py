from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Email(required=True, validate=validate.Email())
    password = fields.Str(required=True, load_only=True)
    created_at = fields.DateTime(dump_only=True)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
