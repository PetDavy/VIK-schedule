import json

from abc import ABC, abstractmethod
from marshmallow import validate, ValidationError

from app.exeptions import InvalidValue


class ValidationSchema:
    def validate(self, data):
        self.validate_empty_field(data)

    def validate_empty_field(cls, data):
        empty_fields = []
        for key, value in data.items():
            if not value:
                empty_fields.append(key)

        if empty_fields:
            raise InvalidValue.empty_fields(empty_fields)


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


class Validator(ABC):
    schema: ValidationSchema = ValidationSchema()

    @abstractmethod
    def validate(self, data):
        """ Validate data """
        pass


class UserValidator(Validator):
    schema = ValidationUserSchema()

    @classmethod
    def validate(cls, data):
        cls.schema.validate(data)

    @classmethod
    def validate_update(cls, data):
        cls.schema.validate(data, is_update=True)


class DataFormatter():
    @staticmethod
    def class_time(raw_value):
        '''
        format: '[{"day": "monday", "startTime": "09:00", "endTime": "10:00"}, {"day": "tuesday", "startTime": "09:00", "endTime": "10:00"}]' # noqa: E501
        '''

        try:
            value = json.loads(raw_value)
            if not isinstance(value, list):
                raise Exception('class_time is not a list')
            for item in value:
                if not isinstance(item, dict):
                    raise Exception('class_time item is not a dict')
                if 'day' not in item:
                    raise Exception('class_time item does not have day')
                if 'startTime' not in item:
                    raise Exception('class_time item does not have startTime')
                if 'endTime' not in item:
                    raise Exception('class_time item does not have endTime')
        except Exception as e:
            raise Exception('class_time is not a valid json') from e

        return value

    @staticmethod
    def class_table(raw_value):
        '''
        format: [<tamestamp>:<duration>] => [{'datetime': <tamestamp>, 'duration': <duration>}] # noqa: E501
        '''

        if not raw_value:
            return []

        table_list = raw_value.split(',')
        values = []
        for item in table_list:
            if ':' not in item:
                raise Exception('class_table item is not a valid format')
            values.append(
                {
                    'datetime': int(item.split(':')[0]),
                    'duration': float(item.split(':')[1])
                }
            )

        return values


class SchemaValidation():
    @staticmethod
    def class_time(value: str):
        formated_value = DataFormatter.class_time(value)
        if not formated_value:
            raise Exception('class_time is not a valid json')

        return value
