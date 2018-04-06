class Users {

    constructor() {

        this.users = [];

    }

    /**
     * Add a new user to users array. If only is passed 
     * it should be an object 
     * 
     * @param {Object} user {id, name, room}
     * @param {String} id 
     * @param {String} name 
     * @param {String} room 
     * @returns Object : Added user
     * @memberof Users
     */
    addUser(user, id, name, room) {

        user = user || { id, name, room };

        this.users.push(user);

        return user;
    }

    /**
     * Removes a users matching the given
     * id from the users array
     * 
     * @param {String} id 
     * @returns object | null
     * @memberof Users 
     */
    removeUser(id) {

        let user = this.getUser(id);

        if (user) this.users = this.users.filter(user => user.id !== id);

        return user;

    }

    /**
     * Returns the user matching the given id
     * 
     * @param {String} id 
     * @returns 
     * @memberof Users
     */
    getUser(id) {

        return this.users.filter(user => user.id === id)[0];

    }

    /**
     * Returns users' names in a given chat room
     * 
     * @param {any} room 
     * @returns 
     * @memberof Users
     */
    getUsersList(room) {

        let users = this.users.filter(user => user.room === room);

        return users.map(user => user.name);
    }

}


module.exports = { Users };