const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {

        users = new Users();

        users.users = [{
                id: '123',
                name: 'Martial',
                room: 'Leaders'
            },
            {
                id: '321',
                name: 'Dekado',
                room: 'Leaders',
            },
            {
                id: '789',
                name: 'Marcellin',
                room: 'Art Fans',
            },
            {
                id: '987',
                name: 'Léon',
                room: 'Art Fans',
            }
        ]

    });

    describe('#addUser', () => {

        it('Should add user', () => {

            let users = new Users();

            let user = { id: '123', name: 'Martial', room: 'Leaders' };

            let resUser = users.addUser(user);

            expect(resUser).toInclude(user);

            expect(users.users).toEqual([user]);

        });

    });

    describe('#getUserList', () => {

        it('Should return names for Leaders room', () => {

            let namesForLeadersRoom = ['Martial', 'Dekado'];

            let namesArray = users.getUsersList('Leaders');

            expect(namesArray).toEqual(namesForLeadersRoom);

        });

        it('Should return names for Art Fans room', () => {

            let namesForLeadersRoom = ['Marcellin', 'Léon'];

            let namesArray = users.getUsersList('Art Fans');

            expect(namesArray).toEqual(namesForLeadersRoom);

        })

    });

    describe('#removeUser', () => {

        it('Should remove a user', () => {

            let userToDelete = users.users[0];

            let res = users.removeUser(userToDelete.id);

            expect(res).toEqual(userToDelete);

            expect(users.users.length).toBe(3);

        });

        it('Should not remove user', () => {

            let res = users.removeUser('852');

            expect(res).toNotExist();

            expect(users.users.length).toBe(4);

        })

    });

    describe('#getUser', () => {

        it('Should find user', () => {

            let user = users.getUser(users.users[0].id);

            expect(user).toEqual(users.users[0]);

        });

        it('Should not find user', () => {

            let user = users.getUser('258');

            expect(user).toNotExist();

        })

    });


});