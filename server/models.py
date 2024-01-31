from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


from config import db
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Varchar(200), nullable=False)

class Guitars(db.Model):
    __tablename__ = 'guitars'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    guitar_id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.string(200), nullable=False)
    description = db.Column(db.String(350), nullable=False)
    # incorporate materials to correspond to categories
    
    
    #do seller and seller guitars model make sense?
    
class Sellers(db.Model):
    __tablename__ = 'sellers'
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    username = db.Column(db.Varchar(200), db.ForeignKey('username'), nullable=False)
    guitars_id = db.Column(db.Integer)
    #is this guitars_id or guitar_id with foreignkey
    
class SellerGuitars(db.Model):
    __tablename__ = 'seller guitars'
    guitar_id = db.Column(db.Integer, db.ForeignKey('guitar_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id', nullable=False))
    username = db.Column(db.Varchar(200), db.ForeignKey('username'), nullable=False)
    price = db.Column(db.Float)
    
    
    
    
    