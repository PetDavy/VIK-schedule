"""empty message

Revision ID: 937c3a9b65f9
Revises: a7c7daf1641e
Create Date: 2022-07-28 22:07:23.774412

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '937c3a9b65f9'
down_revision = 'a7c7daf1641e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('created_at', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'created_at')
    # ### end Alembic commands ###
