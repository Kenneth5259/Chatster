const mysql = ('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chatster_test'
});

module.exports = connection;