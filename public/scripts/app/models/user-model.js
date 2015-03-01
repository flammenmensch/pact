"use strict";

module.exports = function() {
    var __user = null;

    function UserModel() {}

    UserModel.prototype = {
        get user() {
            return __user;
        },

        setUser: function(data) {
            __user = data;
        }
    };

    return new UserModel();
};