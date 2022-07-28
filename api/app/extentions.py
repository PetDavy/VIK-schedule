from flask_sqlalchemy import SQLAlchemy, Model
from flask_migrate import Migrate


class CRUDMixin(Model):
    """
    Mixin that adds convenience methods for CRUD operations.
    """

    def save(self):
        db.session.add(self)
        db.session.commit()


db = SQLAlchemy(model_class=CRUDMixin)
migrate = Migrate()
