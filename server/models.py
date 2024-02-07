from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates


from config import db

db = SQLAlchemy()

# users table: ability to sell , guitars table: price (nullable) or boolean that indicates meant for sale
class Users(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Varchar(50), nullable=False)
    password = db.Column(db.Varchar(50), nullable=False)
    serialize_rules = "-guitars.user"

    guitars = db.relationship("Guitar", backref="user")

    def __repr__(self):
        return (
            f"User(id={self.id}, username={self.username}, is_seller={self.is_seller})"
        )

    @validates("username")
    def validate_username(self, key, value):
        if not value:
            raise ValueError("username is Invalid")
        if len(value) > 20:
            raise ValueError("Username cannot exceed 20 characters")
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

    serialize_rules = -"user.guitars"

    # relationships
    user = db.relationship("User", backref="guitars")

    def __repr__(self):
        return f"Guitar(id={self.id}, user_id={self.user_id}, model={self.model}, description={self.description}), brand={self.brand},material={self.material},accept_bids={self.accept_bids}, accept_exchange={self.accept_exchange})"

    @validates("model")
    def validate_model(self, key, value):
        if not value:
            raise ValueError("Model cannot be empty")
        if len(value) > 200:
            raise ValueError("Model cannot exceed 200 characters")
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

    serialize_rules = ()

    # relationships
    guitar = db.relationship("Guitar", backref="bids")
    user = db.relationship("User", backref="bids")


class Exchanges(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    guitar_id = db.Column(db.Integer, db.ForeignKey("guitars.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    serialize_rules = ()

    # relationships
    guitar = db.relationship("Guitar", backref="exchanges")
    user = db.relationship("User", backref="exchanges")
    
                        
# needs validatiom that must be a from two different guitar( not same ID), and must be a guitar owned by a user, and must be at least one guitar from one user and another guitar from a different user
# FRONTEND VALIDATION: checking THAT LOGGED IN user owns THAT GUITAR you can only exchange your own guitar

    
    
    





    
    
    
    