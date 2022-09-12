"""empty message

Revision ID: e83b46e73923
Revises: ead870f015b5
Create Date: 2022-08-25 22:29:13.633550

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e83b46e73923'
down_revision = 'ead870f015b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('class_table', sa.Column('price', sa.Integer(), nullable=True))
    op.add_column('class_table', sa.Column('duration', sa.Float(), nullable=True))
    op.drop_column('class_table', 'year')
    op.drop_column('class_table', 'day')
    op.drop_column('class_table', 'month')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('class_table', sa.Column('month', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('class_table', sa.Column('day', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('class_table', sa.Column('year', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_column('class_table', 'duration')
    op.drop_column('class_table', 'price')
    # ### end Alembic commands ###