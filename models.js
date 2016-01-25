'use strict';

class UserRepository {

    constructor() {
        this.users = [];
    }

    add(params) {

        if (this.getUser(user.id) === undefined) {
            this._add(user);
        }
    }

    _add(params) {
        var user = new User(params);
        user.subscribe();
        this.users.push(user);
    }

    getUser(id) {
        return this.users.filter((user) => {
           return user.id === id
        }).pop();
    }

    getStatus(id) {
        let user = this.getUser(id);
        return user === undefined? undefined : user.subscribed;
    }

    exists(id){
        return this.getUser(id)    }


}

class User {

    constructor(params) {
        this.name = params.first_name;
        this.id = params.id;
        this.username = params.username;
        this.subscribed = false;
    }

    subscribe() {
        this.subscribed = true;
    }

    unsubscribe() {
        this.subscribed = false;
    }

    pedir(menu){
        this.pedidos.push(menu);
    }
}

function id(msg){
    return msg.from.id;
}
module.exports = {User,UserRepository};