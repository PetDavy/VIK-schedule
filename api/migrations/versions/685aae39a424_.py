"""empty message

Revision ID: 685aae39a424
Revises: 2a1a446ddf1e
Create Date: 2022-08-16 18:16:08.389147

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '685aae39a424'
down_revision = '2a1a446ddf1e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('student_profile', 'class_time',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=600),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('student_profile', 'class_time',
               existing_type=sa.String(length=600),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)
    # ### end Alembic commands ###