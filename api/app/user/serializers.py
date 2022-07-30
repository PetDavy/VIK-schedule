from marshmallow import Schema, fields, validate, post_dump


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Email(required=True, validate=validate.Email())
    password = fields.Str(required=True, load_only=True)
    created_at = fields.DateTime(dump_only=True)
    token = fields.Str(dump_only=True)

    @post_dump
    def create_user(self, data, **kwargs):
        return {'user: ': data}


user_schema = UserSchema()
users_schema = UserSchema(many=True)
