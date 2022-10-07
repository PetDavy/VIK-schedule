from marshmallow import Schema
from marshmallow import fields
from marshmallow import post_dump
from marshmallow import validates_schema

from app.utils.validators.user import UserValidator


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Str()
    password = fields.Str(load_only=True)
    new_password = fields.Str(load_only=True)
    created_at = fields.DateTime(dump_only=True)
    picture = fields.Str()
    is_google_auth = fields.Boolean(dump_only=True)
    token = fields.Str(dump_only=True)

    new_password = fields.Str(load_only=True)

    @post_dump
    def dump_user(self, data, **kwargs):
        return data

    @validates_schema
    def validate_user(self, data, **kwargs):
        UserValidator.validate(data)

    class Meta:
        strict = True


class UserUpdateSchema(UserSchema):
    @validates_schema
    def validate_user(self, data, **kwargs):
        UserValidator.validate_update(data)


user_schema = UserSchema()
users_schema = UserSchema(many=True)
user_update_schema = UserUpdateSchema()
