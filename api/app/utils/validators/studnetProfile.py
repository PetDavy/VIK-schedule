from .base import ValidationSchema, Validator
from marshmallow import validate, ValidationError

from app.exeptions import InvalidValue


class ValidationStudentProfileSchema(ValidationSchema):
    def validate(self, data, is_update=False):
        errors = []
        super().validate(data)

        if data.get('class_price'):
            self.validate_class_price(data['class_price'], errors=errors)

        if errors:
            raise InvalidValue.invalid_fields(errors)

    def validate_class_price(self, class_price, errors):
        try:
            validator = validate.Range(min=1, max=300)
            validator(class_price)
        except ValidationError:
            errors.append('class_price')


class StudentProfileValidator(Validator):
    schema = ValidationStudentProfileSchema()

    @classmethod
    def validate(cls, data):
        cls.schema.validate(data)

    @classmethod
    def validate_update(cls, data):
        cls.schema.validate(data, is_update=True)
