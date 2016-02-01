'use strict';

/**
 *
 * @param {Function} funcion
 * @return {Boolean} result
 */
Array.prototype.anySatisfy = function anySatisfy(funcion) {

    return !this.filter(funcion).isEmpty()

};

/**
 *
 * @return {Boolean} result
 */
Array.prototype.isEmpty = function isEmpty() {

    return this.length === 0;

};

class UserRepository {

    constructor() {
        this.users = [];
    }

    add(user) {
        this.users.push(new User(user));
    }

    isRegistered(id) {
        return this.users.anySatisfy((user) => {
            user.id == id
        });
    }

    /**
     *
     * @param user
     * @returns {User}
     */
    getUser(user) {

        if (!this.isRegistered(user.id)) {
            this.add(user);
        }
        return this.users.find((user) => {
            return user.id === user.id
        });
    }
}

class User {

    constructor(params) {
        this.name = params.first_name;
        this.id = params.id;
        this.username = params.username;
        this.alias = '';
        this.unsubscribe();
    }

    suscribe() {
        this.isSubscript = true;
        this.status = 'suscripto!';
    }

    unsubscribe() {
        this.isSubscript = false;
        this.status = 'sin suscripción!';
    }

    isValidAlias() {
        return this.alias !== '';
    }
}

module.exports = {User, UserRepository};