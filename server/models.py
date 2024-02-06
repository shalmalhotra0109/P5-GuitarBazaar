from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


from config import db
db = SQLAlchemy()

#users table: ability to sell , guitars table: price (nullable) or boolean that indicates meant for sale
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Varchar(50), nullable=False)
    is_seller= db.Column(db.Boolean, default=False, nullable=False)
    #boolean indicated seller or not which lets toggle available or not
    serialize_rules = ('-guitars.user')
    
    guitars = db.relationship( 'Guitar', backref= 'user')
    
    def __repr__(self):
        return f'User(id={self.id}, username={self.username}, is_seller={self.is_seller})'
    
    @validates('username')
    def validate_username(self,key,value):
        if not value:
            raise ValueError('username is Invalid')
        if len(value) > 20:
            raise ValueError('Username cannot exceed 20 characters')
        return value
    
    
    

class Guitar(db.Model, SerializerMixin):
    __tablename__ = 'guitars'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    is_seller = db.Column(db.Boolean, default=False, nullable=False)
    seller_mode = db.Column(db.Boolean, default=False, nullable=False)
    price = db.Column(db.Float, nullable=True)
    accept_bids = db.Column(db.Boolean, default=False, nullable=False)
    accept_exchange = db.Column(db.Boolean, default=False, nullable=False)
    
    serialize_rules = (-'user.guitars')
    
    #relationships
    user = db.relationship('User', backref='guitars')
     

    def __repr__(self):
        return f'Guitar(id={self.id}, user_id={self.user_id}, model={self.model}, description={self.description},is_selling={self.is_selling})'
    
    @validates('model')
    def validate_model(self,key,value):
        if not value:
            raise ValueError('Model cannot be empty')
        if len(value) > 200:
            raise ValueError("Model cannot exceed 200 characters")
        return value
    @validates('is_selling')
    def validate_is_selling(self, key, value):
        if value is None:
            raise ValueError("is_selling must have a value")
        return value
    
    @validates('price')
    def validate_price(self, key, value):
        if self.is_selling and value is None:
            raise ValueError("Price is required when the guitar is for sale")
        return value
        
                             
    
    # incorporate materials to correspond to categories
    #boolean to be sold or not selling and nullable price: if false no ability to set price, if true you have access to set price
    
    
    #do seller and seller guitars model make sense?
    
class Sellers(db.Model, SerializerMixin):
    __tablename__  = 'sellers'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    username = db.Column(db.Varchar(200), db.ForeignKey('username'), nullable=False)
    guitars_id = db.Column(db.Integer)
    #boolean in users table to indicate seller
    #is this guitars_id or guitar_id with foreignkey
    serialize_rules = ('-user.sellers')
    
    #relationships
    user = db.relationship('User', backref='sellers')
    
   # @validates username again?
   
    
    
class SellerGuitars(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    __tablename__ = 'seller guitars'
    guitar_id = db.Column(db.Integer, db.ForeignKey('guitar_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id', nullable=False))
    username = db.Column(db.Varchar(200), db.ForeignKey('username'), nullable=False)
    price = db.Column(db.Float)
    #get rid of table?
    
    serialize_rules = ('-guitar.seller_guitars', 'user.seller_guitars')
    #relationships
    guitar = db.relationship('Guitar', backref='seller_guitars')
    user = db.relationship('User', backref='seller_guitars')
    
    #@validates('username')
    
class UserLikes(db.Model, SerializerMixin):
    guitar_id = db.Column(db.Integer, db.ForeignKey('guitar_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_id'), nullable=False)
    
    serialize_rules = ('-guitar.user_likes', 'user.user_likes')
    #relationships
    guitar = db.relationship('Guitar', backref='user_likes')
    user = db.relationship('User', backref='user_likes')
    
    
    
class Categories(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    guitar_brand = db.Column(db.String(200))
    guitar_material = db.Column(db.String(200))
    year = db.Column(db.Integer)
   #serialize_rules
    serialize_rules = ('-subcategories.category')
   #relationships
    subcategories = db.relationship('Subcategories', backref='category')
   
    @validates('guitar_brand')
    def validates_guitar_brand(self,key,value):
       if value is not None and len(value) > 200:
           raise ValueError("Brand cannot exceed 200 characters")
       return value 
    @validates('guitar_material')
    def validates_guitar_material(self,key,value):
       if value is not None and len(value) > 200:
           raise ValueError("Brand cannot exceed 200 characters")
       return value
class Subcategories(db.Model, SerializerMixin):
    __tablename__ = 'subcategories'
    id = db.Column(db.Integer, primary_key=True)
    subcategory_name = db.Column(db.String(200))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    
    serialize_rules = ('-category.subcategories')
    
    #relationships
    category = db.relationship('Categories', backref='subcategories')
    
    #validations
    @validates('subcategory_name')
    def validates_subcategory_name(self,key,value):
        if value is not None and len(value) > 200:
            raise ValueError("Subcategory cannot exceed 200 characters")
        return value



    
    
    
    