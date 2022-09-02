import datetime as dt
from app.extentions import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, default=dt.datetime.utcnow)
    picture = db.Column(db.String(360))
    is_google_auth = db.Column(db.Boolean, default=False)
    token: str = ''

    def __init__(self, username, email, **kwargs):
        db.Model.__init__(
            self,
            username=username,
            email=email,
            **kwargs 
        )

        if 'password' in kwargs:
            self.set_password(kwargs['password'])

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return '<User %r>' % self.username
