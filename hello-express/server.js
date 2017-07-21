var express = require('express');
var app = express();
var port = 3000;
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('HelloExpress.db');

// Create a Table and Populate with Sample Data

// The easiest way to setup and populate a table in your database is to do so manually using the SQLite shell.

// Open the HelloExpress.db database in the SQLite shell from your command prompt (within your hello-express folder):
// sqlite3 HelloExpress.db

// Create a table named Quotes
// CREATE TABLE Quotes(Quote VARCHAR(255), Author VARCHAR(255));

// Insert sample data so that it's easier to test as you work:
// INSERT INTO Quotes VALUES ('Life is Short', 'Unknown');

// Run a SELECT statement to ensure your table contains data:
// SELECT * FROM Quotes;

// Define SQL Queries for Routes

// All that remains now is to add SQL statements to your routes as needed.



app.get(`/`, function(request, response){
    response.send("Hello, World");
});

app.get(`/quotes`, function(request, response){

   db.all("SELECT * FROM Quotes", function(err, rows){
        console.log("GET Quotes: The database currently contains the following: " + rows);

        response.send(rows);
    });
});

app.get(`/quotes/:author`, function(request, response){

   db.all("SELECT * FROM Quotes WHERE Author = ?", [request.params.author], function(err, rows){
        console.log("GET Request for author: " + request.params.author);

        response.send(rows);
    });
});

app.post('/quotes', function(request, response) {
    db.run("INSERT INTO Quotes VALUES ?", req.body)
});

app.listen(port, function(){
    console.log("Express app listening on port " + port);
});