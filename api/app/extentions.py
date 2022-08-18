from flask_sqlalchemy import SQLAlchemy, Model
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from .user import models


class CRUDMixin(Model):
    """
    Mixin that adds convenience methods for CRUD operations.
    """

    def save(self):
        db.session.add(self)
        db.session.commit()


def send_user_identity(user):
    return user.id


def load_identity(_jwt_header, jwt_data):
    identity = jwt_data['sub']
    return models.User.query.get(int(identity))


db = SQLAlchemy(model_class=CRUDMixin)
migrate = Migrate(compare_type=True)
jwt = JWTManager()

jwt.user_identity_loader(send_user_identity)
jwt.user_lookup_loader(load_identity)
