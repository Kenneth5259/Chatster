const conn = require('../middleware/connection');
class User {
    id;
    firstName;
    lastName;
    email;
    password;
}

const createNewUser = () => {

};

module.exports = [
    User,
    createNewUser
];