/**
 * Created by Erwin on 30/01/2016.
 */
'use strict';

class Matched {

    constructor(val) {
        this.value = val;
    }

    fold() {
        return this;
    }
}

class NotMatched {

    constructor() {
    }

    fold(val) {
        return val;
    }
}

var r = function (a, b, c) {
    return 1;
};

var NotMatchedContainer = function (f) {

    return function () {
        var result = f.apply(null, arguments);
        return result === undefined ? new NotMatched() : new Matched(result);
    }
};


module.exports = {NotMatchedContainer};
