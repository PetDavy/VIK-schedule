"""empty message

Revision ID: 372a48091b3d
Revises: 685aae39a424
Create Date: 2022-08-18 00:04:28.511862

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '372a48091b3d'
down_revision = '685aae39a424'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('student_profile', 'class_table',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=1000),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('student_profile', 'class_table',
               existing_type=sa.String(length=1000),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)
    # ### end Alembic commands ###
