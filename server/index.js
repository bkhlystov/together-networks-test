/**
 * Created by bohdan on 27.05.2020.
 * More details about creating webserver: https://code.tutsplus.com/ru/tutorials/code-your-first-api-with-nodejs-and-express-connect-a-database--cms-31699
 * How to install and config mysql global: https://linux4one.com/how-to-install-mysql-on-linux-mint-19/
 */
const express = require('express'); // оснастка веб сервера
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql',
};

// Create a MySQL pool, he is allows us to use many connections at the same time,
// rather than opening and closing them manually.
const pool = mysql.createPool(config);

// Server http://localhost:8081/
const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`api allow to url http://localhost:${port}/users`);
});

// Display all users
app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

// Display a single user by ID
app.get('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

// Add a new user
app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
        if (error) throw error;

        response.status(201).send({
            'Message': `User added with ID: ${result.insertId}`,
            'id': result.insertId
        });
    });
});

// Update an existing user
app.put('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
        response.send({
            'Message': 'User updated successfully.',
            'id': id
        });
    });
});

// Delete a user
app.delete('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.send({
            'Message': 'User deleted.',
            'id': id
        });
    });
});
