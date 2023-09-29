"""empty message

Revision ID: 1c51fdbcefca
Revises: e57208e8113a
Create Date: 2023-09-29 09:22:03.439837

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c51fdbcefca'
down_revision = 'e57208e8113a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('animal_shelter', schema=None) as batch_op:
        batch_op.alter_column('zip_code',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=15),
               existing_nullable=False)
        batch_op.alter_column('cif',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=20),
               existing_nullable=False)

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('calculated_rating',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=2),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('calculated_rating',
               existing_type=sa.Float(precision=2),
               type_=sa.REAL(),
               existing_nullable=True)

    with op.batch_alter_table('animal_shelter', schema=None) as batch_op:
        batch_op.alter_column('cif',
               existing_type=sa.String(length=20),
               type_=sa.INTEGER(),
               existing_nullable=False)
        batch_op.alter_column('zip_code',
               existing_type=sa.String(length=15),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
