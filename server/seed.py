from app import create_app
from models import db, Users, Guitars, UserLikes, Bids, Exchanges

app = create_app()

with app.app_context():
    def seed():
        try:
            # FOR DEMO:
            # users:
            # 'id': ''
            # 'username': ''
            # 'password': ''
            
            user1 = Users(id=1, username='shalwuzhere', password='shal123')
            user2 = Users(id=2, username='peyton319', password='peyton123')
            user3 = Users(id=3, username='codycoggins', password='cody123')
            user4 = Users(id=4, username='tommorello', password='tomrox123')
            user5 = Users(id=5, username='prince80', password='princeiscool123')
            user6 = Users(id=6, username='chilipeppers1', password='chili')
            user7 = Users(id=7, username='mickfleetwood', password='silversprings')
            
        #   id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, nullable=True)
    # brand = db.Column(db.String(200))
    # model = db.Column(db.String(200))
    # material = db.Column(db.String(200))
    # description = db.Column(db.String(350))
    # accept_bids = db.Column(db.Boolean, default=False, nullable=False)
    # accept_exchange
            guitar1 = Guitars(user_id=1, brand='Squier',model='Paranormal Jazzmaster XII', material='Body: Poplar, Neck: Maple, Fingerboard: Laurel, Finish: gloss polyurethane')
            guitar2 = Guitars(user_id=2, brand='Gibson',model='Billie Joe Armstrong Les Paul Junior', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Rosewood, Finish: ebony gloss')
            guitar3 = Guitars(user_id=3, brand='Fender',model='Jimmy Page Telecaster', material='Body: Solid Ash, Neck: Maple, Fingerboard: Rosewood, Finish: satin lacquer')
            guitar4 = Guitars(user_id=4, brand='PRS',model='Private Stock Carlos Santana Crossroads edition', material='Body: Mahogany, Neck: Maple, Fingerboard: Brazilian Rosewood, Finish: gloss nitrocellulose lacquer')
            guitar5 = Guitars(user_id=5, brand='Gibson',model='Lzzy Hale Signature Explorerbird ', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Indian Rosewood, Finish: gloss nitrocellulose lacquer')
            guitar6 = Guitars(user_id=1, brand='Fender',model='Tom Morello Soul Power Stratocaster', material='Body: Alder, Neck: Maple, Fingerboard:Rosewood, Finish: gloss')
            guitar7 = Guitars(user_id=7, brand='PRS',model='Private Stock Custom 24-08', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Brazilian Rosewood, Finish: high gloss nitrocellulose')
            
            

            db.session.add_all([user1, user2, user3, user4, user5, user6, user7, guitar1, guitar2, guitar3, guitar4, guitar5, guitar6, guitar7])
            db.session.commit()


            user_likes1 = UserLikes(user1=user1,)
            user_likes2 = UserLikes(user2=user2,)
            
            db.session.add_all([user_likes1, user_likes2])
            db.session.commit()
            
            bid1 = Bids(offer=950, user2 = guitar7)
            bid2 = Bids(offer=2000, user6 = guitar1)
            
            db.session.add_all([bid1, bid2])
            db.session.commit()
            
            

            print("Database seeded successfully!")
        except Exception as e:
            print(f"An error occurred while seeding the database: {e}")
            db.session.rollback()

    if __name__ == '__main__':
        seed()