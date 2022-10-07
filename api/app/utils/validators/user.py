from marshmallow import validate, ValidationError

from app.exeptions import InvalidValue
from .base import ValidationSchema, Validator


class ValidationUserSchema(ValidationSchema):
    def validate(self, data, is_update=False):
        errors = []
        if not is_update:
            super().validate(data)
        else:
            # data without picture field
            update_data = {key: value for key, value in data.items() if key != 'picture'} # noqa
            super().validate(update_data)

        if data.get('email'):
            self.validate_email(data['email'], errors=errors)

        if data.get('password'):
            self.validate_password(data['password'], errors=errors)

        if data.get('new_password'):
            self.validate_password(data['new_password'], errors=errors, fieldname='new_password') # noqa

        # todo picture validation

        if errors:
            raise InvalidValue.invalid_fields(errors)

    def validate_email(self, email, errors):
        try:
            validator = validate.Email()
            validator(email)
        except ValidationError:
            errors.append('email')

    def validate_password(self, password, errors, fieldname='password'):
        """
            Password must be at least 8 characters long
            and contain at least one
            digit, one uppercase letter,
            one lowercase letter, and one special
            character.
        """
        try:
            validator = validate.And(
                validate.Length(min=8),
                validate.Length(max=80),
                validate.Regexp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$') # noqa
            )

            validator(password)
        except ValidationError:
            errors.append(fieldname)


class UserValidator(Validator):
    schema = ValidationUserSchema()

    @classmethod
    def validate(cls, data):
        cls.schema.validate(data)

    @classmethod
    def validate_update(cls, data):
        cls.schema.validate(data, is_update=True)
