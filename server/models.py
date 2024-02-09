from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


from config import db

db = SQLAlchemy()

# users table: ability to sell , guitars table: price (nullable) or boolean that indicates meant for sale
class Users(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    
    serialize_rules = "-guitars.user, -user_likes.user, -bids.user, -exchanges.user"

    guitars = db.relationship("Guitar", backref="user")
    user_likes = db.relationship("UserLikes", backref="user")
    bids = db.relationship("Bids", backref="user")
    exchanges = db.relationship("Exchanges", backref="user")

    def __repr__(self):
        return (
            f"User(id={self.id}, username={self.username}, password={self.password})"
        )
        
    @validates("username")
    def validate_username(self, key, value):
        if not value:
            raise ValueError("username is Invalid")
        if len(value) > 50:
            raise ValueError("Username cannot exceed 50 characters")
        return value
    @validates("password")
    def validate_password(self, key, value):
        if not value:
            raise ValueError("password is Invalid")
        if len(value) > 50:
            raise ValueError("Password cannot exceed 50 characters")
        return value


class Guitars(db.Model, SerializerMixin):
    __tablename__ = "guitars"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=True)
    brand = db.Column(db.String(200))
    model = db.Column(db.String(200))
    material = db.Column(db.String(200))
    description = db.Column(db.String(350))
    accept_bids = db.Column(db.Boolean, default=False, nullable=False)
    accept_exchange = db.Column(db.Boolean, default=False, nullable=False)

    serialize_rules = "-user.guitars, -user.guitars.user_likes, -user.guitars.bids, -user.guitars.exchanges"

    # relationships
    user = db.relationship("User", backref="guitars")
    user_likes = db.relationship("UserLikes", backref="guitar")
    bids = db.relationship("Bids", backref="guitar")
    exchanges = db.relationship("Exchanges", backref="guitar")

    def __repr__(self):
        return f"Guitar(id={self.id}, user_id={self.user_id}, model={self.model}, description={self.description}), brand={self.brand},material={self.material},accept_bids={self.accept_bids}, accept_exchange={self.accept_exchange})"

    @validates("brand")
    def validate_brand(self, key, value):
        if not value:
            raise ValueError("Brand cannot be empty")
        if len(value) > 200:
            raise ValueError("Brand cannot exceed 200 characters")
        return value
    @validates("model")
    def validate_model(self, key, value):
        if not value:
            raise ValueError("Model cannot be empty")
        if len(value) > 200:
            raise ValueError("Model cannot exceed 200 characters")
        return value
    @validates("material")
    def validate_material(self, key, value):
        if not value:
            raise ValueError("Material cannot be empty")
        if len(value) > 200:
            raise ValueError("Material cannot exceed 200 characters")
        return value
    @validates("description")
    def validate_description(self, key, value):
        if not value:
            raise ValueError("Description cannot be empty")
        if len(value) > 200:
            raise ValueError("Description cannot exceed 350 characters")
        return value


class UserLikes(db.Model, SerializerMixin):
    guitar_id = db.Column(db.Integer, db.ForeignKey("guitar_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user_id"), nullable=False)

    serialize_rules = ("-guitar.user_likes", "user.user_likes")
    # relationships
    guitar = db.relationship("Guitar", backref="user_likes")
    user = db.relationship("User", backref="user_likes")


class Bids(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    guitar_id = db.Column(db.Integer, db.ForeignKey("guitars.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    offer_price = db.Column(db.Float)

    serialize_rules = ("-guitar.bids", "-user.bids")

    # relationships
    guitar = db.relationship("Guitar", backref="bids")
    user = db.relationship("User", backref="bids")
    
    @validates("offer_price")
    def validate_offer_price(self, key, value):
        if not isinstance(value, float):
            raise ValueError("Offer price must be a float")
        return value


class Exchanges(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    guitar_id = db.Column(db.Integer, db.ForeignKey("guitars.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    serialize_rules = ("-guitar.exchanges", "-user.exchanges")

    # relationships
    guitar = db.relationship("Guitar", backref="exchanges")
    user = db.relationship("User", backref="exchanges")
    @validates("offer_guitar")
    def validate_offer_guitar(self, key, value):
        if not isinstance(value, Guitars):
            raise ValueError("Offered item must be a guitar")
        return value
    # go over this validation  because should it be must be a guitar in YOUR inventory?
                        
# needs validatiom that must be a from two different guitar( not same ID), and must be a guitar owned by a user, and must be at least one guitar from one user and another guitar from a different user
# FRONTEND VALIDATION: checking THAT LOGGED IN user owns THAT GUITAR you can only exchange your own guitar

    
    
    





    
    
    
    