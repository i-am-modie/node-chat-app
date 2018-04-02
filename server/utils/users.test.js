const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'MoDie',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Chell',
            room: 'Test Chamber'
        }, {
            id: '3',
            name: 'Number 3',
            room: 'Node Course'
        },]
    });


    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '20',
            name: 'Chell',
            room: 'Test chamber'
        };
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let shouldGetted = users.users[2];
        let getted = users.removeUser('3');
        expect(getted).toBe(shouldGetted);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        let getted = users.removeUser('4');
        expect(getted).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        let shouldGetted = users.users[1];
        let getted = users.getUser('2');
        expect(getted).toBe(shouldGetted);
    });

    it('should not find user', () => {
        let getted = users.getUser('4');
        expect(getted).toBe(undefined);
    });

    it('should return names for Node courser', () => {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['MoDie', 'Number 3']);
    });

    it('should return names for Test Chamber', () => {
        let userList = users.getUserList('Test Chamber');

        expect(userList).toEqual(['Chell']);
    });

});