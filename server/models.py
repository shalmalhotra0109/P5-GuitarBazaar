from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin


from config import db
db = SQLAlchemy()

#users table: ability to sell , guitars table: price (nullable) or boolean that indicates meant for sale
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Varchar(200), nullable=False)
    is_seller= db.Column(db.Boolean, default=False, nullable=False)
    #boolean indicated seller or not which lets toggle available or not
    
    

class Guitars(db.Model):
    __tablename__ = 'guitars'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    model = db.Column(db.string(200), nullable=False)
    description = db.Column(db.String(350), nullable=False)
    is_selling = db.Column(db.Boolean, default=False, nullable=False)
    price = db.Column(db.Float, nullable=True)
    # incorporate materials to correspond to categories
    #boolean to be sold or not selling and nullable price: if false no ability to set price, if true you have access to set price
    
    
    #do seller and seller guitars model make sense?
    
class Sellers(db.Model):
    __tablename__ = 'sellers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    username = db.Column(db.Varchar(200), db.ForeignKey('username'), nullable=False)
    guitars_id = db.Column(db.Integer)
    #boolean in users table to indicate seller
    #is this guitars_id or guitar_id with foreignkey
    
class SellerGuitars(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    __tablename__ = 'seller guitars'
    guitar_id = db.Column(db.Integer, db.ForeignKey('guitar_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id', nullable=False))
    username = db.Column(db.Varchar(200), db.ForeignKey('username'), nullable=False)
    price = db.Column(db.Float)
    #get rid of table?
    
    
class UserLikes(db.Model):
    guitar_id = db.Column(db.Integer, db.ForeignKey('guitar_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    
class Categories(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    guitar_brand = db.Column(db.String(200))
    guitar_material = db.Column(db.String(200))
    year = db.Column(db.Integer)
   # material
   #year

class Subcategories(db.Model):
    __tablename__ = 'subcategories'
    id = db.Column(db.Integer, primary_key=True)
    subcategory_name = db.Column(db.String(200))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)




    
    
    
    