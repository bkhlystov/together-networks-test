/**
 * Created by bohdan on 27.05.2020.
 */
const express = require('express'); // оснастка веб сервера
const app = express();
const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// сервер для http://localhost:8081/
const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("server allow to url example http://localhost:", host, port, '/users');
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

        response.status(201).send(`User added with ID: ${result.insertId}`);
    });
});

// Update an existing user
app.put('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;

        response.send('User updated successfully.');
    });
});

// Delete a user
app.delete('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send('User deleted.');
    });
});
