/**
 * Created by bohdan on 27.05.2020.
 */
var express = require('express'); // оснастка веб сервера
var app = express();
var sql = require('mysql'); // клиент для MS SQL Server

// строка для подключения к базе данных.
var sqlConfig = {
    user: 'root',
    password: 'qwertyu',
    server: 'localhost',
    database: 'root'
};

// Create a MySQL pool
const pool = sql.createPool(sqlConfig);

// сервер для http://localhost:8081/
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("сервер доступен по url http://%s:%s", host, port);
});

// app.get('/sales', function (req, res) {
//     sql.createPool(sqlConfig, function() {
//         var request = new sql.Request();
//         request.query('select * from sales', function(err, resp) {
//             if(err) console.log(err);
//             res.json(resp.recordset); // результат в формате JSON
//             sql.close(); // закрываем соединение с базой данных
//         });
//     });
// });

app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

// app.get('/sales/:id', function (req, res) {
//     sql.connect(sqlConfig, function() {
//         var request = new sql.Request();
//         request.input('input_parameter', sql.Int, Number(req.params.id)) // защита от SQL-инъекций и преобразование к числовому типу
//             .query('select * from sales where id = @input_parameter', function(err, resp) {
//                 if(err) console.log(err);
//                 res.json(resp.recordset); // результат в формате JSON
//                 sql.close(); // закрываем соединение с базой данных
//             });
//     });
// });
//
// app.post('/sales/:id/invoices', function (req, res) {
//     sql.connect(sqlConfig, function() {
//         var request = new sql.Request();
//         request.input('idSales', sql.Int, Number(req.params.id)) // защита от SQL-инъекций
//             .execute('addInvoices', function(err, resp, returnValue, affected) {
//                 if(err) console.log(err);
//                 res.json(resp.recordset); // результат в формате JSON
//                 sql.close(); // закрываем соединение с базой данных
//             });
//     });
// });