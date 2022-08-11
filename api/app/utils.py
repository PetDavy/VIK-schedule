import json


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


class SchemaValidation():
    @staticmethod
    def class_time(value: str):
        formated_value = DataFormatter.class_time(value)
        if not formated_value:
            raise Exception('class_time is not a valid json')

        return value
