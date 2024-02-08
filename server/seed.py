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
            guitar1 = Guitars(user_id=1, brand='Squier',model='Paranormal Jazzmaster XII', material='Body: Poplar, Neck: Maple, Fingerboard: Laurel, Finish: gloss polyurethane', description= 'The Squier Paranormal Jazzmaster XII gives guitarists 12 strings of sonic possibility. This classic offset electric guitar features dual Fender-Designed alnico single-coil Jazzmaster pickups that provide a rich tone with bright highs and robust lows', accept_bids= True, accept_exchange=True)
            guitar2 = Guitars(user_id=2, brand='Gibson',model='Billie Joe Armstrong Les Paul Junior', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Rosewood, Finish: ebony gloss', description='exceptional guitar to rock out on, whether you play rock or punk. Designed in collaboration with Green Day’s legendary guitarist, it has everything you need for great tone with no frills to get in your way, including a mahogany neck with a Billie Joe Armstrong SlimTaper profile', accept_bids= True, accept_exchange=True)
            guitar3 = Guitars(user_id=3, brand='Fender',model='Jimmy Page Telecaster', material='Body: Solid Ash, Neck: Maple, Fingerboard: Rosewood, Finish: satin lacquer', description='meticulous recreation of his legendary instrument', accept_bids= True, accept_exchange=True)
            guitar4 = Guitars(user_id=4, brand='PRS',model='Private Stock Carlos Santana Crossroads edition', material='Body: Mahogany, Neck: Maple, Fingerboard: Brazilian Rosewood, Finish: gloss nitrocellulose lacquer', description='this stunning guitar is graced with a 24-fret fingerboard of coveted Brazilian rosewood from their legendary wood collection', accept_bids=True, accept_exchange=False)
            guitar5 = Guitars(user_id=5, brand='Gibson',model='Lzzy Hale Signature Explorerbird ', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Indian Rosewood, Finish: gloss nitrocellulose lacquer', description='The Explorerbird combines the classic Explorer body shape with a Firebird headstock for enhanced tuning stability and a one-of-a-kind look', accept_bids=True, accept_exchange=True)
            guitar6 = Guitars(user_id=1, brand='Fender',model='Tom Morello Soul Power Stratocaster', material='Body: Alder, Neck: Maple, Fingerboard:Rosewood, Finish: gloss', description='TOM MORELLO REPLICA.THAT IS ALL', accept_bids=True, accept_exchange=False)
            guitar7 = Guitars(user_id=7, brand='PRS',model='Private Stock Custom 24-08', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Brazilian Rosewood, Finish: high gloss nitrocellulose', description= 'great sound quality, a big fan of PRS and their ability to create uniqueness. As with any PRS guitar, the fit, finish and playability are flawless', accept_bids=True, accept_exchange=True)
            guitar8 = Guitars(user_id=6, brand='Charvel', model='Charvel Pro-Mod DK24 Black Burst', material='Body:Alder, Neck: Caramelized Maple, Finish: gloss', description= 'this brazen instrument is for the progressive guitarist searching for the ultimate in tonal versatility. Featuring a sculpted shredder cut heel for effortless upper fret access, the alder Dinky body is topped with an elegant quilt maple top in captivating finishes', accept_bids=True, accept_exchange=True)
            
            

            db.session.add_all([user1, user2, user3, user4, user5, user6, user7, guitar1, guitar2, guitar3, guitar4, guitar5, guitar6, guitar7, guitar8])
            db.session.commit()


            user_likes1 = UserLikes(user1=user1,)
            user_likes2 = UserLikes(user2=user2,)
            
            db.session.add_all([user_likes1, user_likes2])
            db.session.commit()
            
            bid1 = Bids(offer=950, user2 = guitar7)
            bid2 = Bids(offer=2000, user6 = guitar1)
            
            db.session.add_all([bid1, bid2])
            db.session.commit()
            
            exchange1 = Exchanges(user1: offer= guitar1 = guitar4)
            exchange2 = Exchanges(user4: offer=guitar4) 
            
            db.session.add_all([exchange1, exchange2])
            db.session.commit()
            

            print("Database seeded successfully!")
        except Exception as e:
            print(f"An error occurred while seeding the database: {e}")
            db.session.rollback()

    if __name__ == '__main__':
        seed()