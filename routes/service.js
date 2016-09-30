"use strict";

var fs = require("fs");

module.exports = {
    method1: hello,
    method2: teste
}

function hello() {
    console.log("xxxxxxxxxxxxxxxxxxxxx");
}

function teste(eu) {
    console.log("oo" + eu);
    var file =  "soft-flight.db";
    var exists = fs.existsSync(file);

    if (!exists) {
        console.log("Creating DB file.");
        fs.openSync(file, "w");
    }

    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database(file);

    db.serialize(function () {
        if (!exists) {
            db.run(" CREATE TABLE `project` ("+
	               " `name`	TEXT NOT NULL,"+
                   " `id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT );");
        }

        var stmt = db.prepare("INSERT INTO project (name) VALUES (?)");

        //Insert random data
        var rnd;
        for (var i = 0; i < 10; i++) {
            rnd = Math.floor(Math.random() * 10000000);
            stmt.run("Thing #" + rnd);
        }

        stmt.finalize();
        db.each("SELECT rowid AS id, name FROM project", function (err, row) {
            console.log(row.id + ": " + row.name);
        });
    });

    db.close();
}