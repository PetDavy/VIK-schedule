import os
import pathlib
from flask_sqlalchemy import SQLAlchemy, Model
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from google_auth_oauthlib.flow import Flow

from .user import models


class CRUDMixin(Model):
    """
    Mixin that adds convenience methods for CRUD operations.
    """

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self, **kwargs):
        for attr, value in kwargs.items():
            setattr(self, attr, value)
        self.save()

    def delete(self):
        db.session.delete(self)
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

flow = Flow.from_client_secrets_file(
   client_secrets_file=os.path.join(pathlib.Path(__file__).parent.parent, 'client_secrets.json'),
   scopes=['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'],
   redirect_uri='http://127.0.0.1:5000/callback'
)
