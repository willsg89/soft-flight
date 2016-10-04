"use strict";

module.exports = {
    method1: hello,
    method2: teste
}

var sqlite3 = require("sqlite3");
var fs = require("fs");
var dbFile = __dirname + "/../db/soft-flight.db";

init()

function init() {
    console.log("service.js init");

    var exists = fs.existsSync(dbFile);
    if (!exists) {
        console.log("Created DB file.");
        fs.openSync(dbFile, "w");
    } else{
        console.log("DB file already exist.");
    }

    if (!exists) {
        var db = new sqlite3.Database(dbFile);
        db.serialize(function () {
            db.run(" CREATE TABLE `project` (" +
	               " `name`	TEXT NOT NULL," +
                " `id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT );");
            console.log("==============.");        

        });
        db.close();
        console.log("Created tables project and builds.");        
    }
}

function hello() {
    console.log("xxxxxxxxxxxxxxxxxxxxx");
}

function teste(successCallback) {
    var db = new sqlite3.Database(dbFile);
    db.serialize(function () {
        /*
        var stmt = db.prepare("INSERT INTO project (name) VALUES (?)");

        //Insert random data
        var rnd;
        for (var i = 0; i < 10; i++) {
            rnd = Math.floor(Math.random() * 10000000);
            stmt.run("Thing #" + rnd);
        }
        

        stmt.finalize();
        */
        var x = []
        db.each(
            "SELECT id, name FROM project",
            function (err, row){
                console.log(row.id + ": " + row.name);
                x.push(row);
            },
            function () {
                successCallback(x);
            }
        );
    });

    db.close();
}