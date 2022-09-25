import pytest

from app.app import create_app
from app.extentions import db as _db
from app.settings import TestConfig


@pytest.fixture()
def app():
    _app = create_app(TestConfig)

    with _app.app_context():
        _db.create_all()

    ctx = _app.test_request_context()
    ctx.push()

    yield _app

    ctx.pop()


@pytest.fixture()
def client(app):
    return app.test_client()
