from abc import ABC, abstractmethod

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


class Validator(ABC):
    schema: ValidationSchema = ValidationSchema()

    @abstractmethod
    def validate(self, data):
        """ Validate data """
        pass
