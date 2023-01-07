from .base import ValidationSchema, Validator
from marshmallow import validate, ValidationError

from app.exeptions import InvalidValue


class ValidationStudentSchema(ValidationSchema):
    def validate(self, data, is_update=False):
        errors = []
        super().validate({'name': data.get('name', '')})

        if data.get('name'):
            self.validate_name(data['name'], errors=errors)

        if data.get('age'):
            self.validate_age(data['age'], errors=errors)

        if data.get('info'):
            self.validate_info(data['info'], errors=errors)

        if errors:
            raise InvalidValue.invalid_fields(errors)

    def validate_name(self, name, errors):
        try:
            validator = validate.Length(min=1, max=50)
            validator(name)
        except ValidationError:
            errors.append('name')

    def validate_age(self, age, errors):
        try:
            validator = validate.Range(min=1, max=100)
            validator(age)
        except ValidationError:
            errors.append('age')

    def validate_info(self, info, errors):
        try:
            validator = validate.Length(min=1, max=500)
            validator(info)
        except ValidationError:
            errors.append('info')


class StudentValidator(Validator):
    schema = ValidationStudentSchema()

    @classmethod
    def validate(cls, data):
        cls.schema.validate(data)

    @classmethod
    def validate_update(cls, data):
        cls.schema.validate(data, is_update=True)
