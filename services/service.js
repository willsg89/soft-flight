"use strict";

module.exports = {
    addProject: addProject,
    findAllProjetcs: findAllProjetcs
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
    } else {
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

function addProject(project, successCallback) {
    var db = new sqlite3.Database(dbFile);
    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO project (name) VALUES (?)");
        stmt.run(project.name);
        stmt.finalize();
        successCallback();
    });
    db.close();
}

function findAllProjetcs(successCallback) {
    var db = new sqlite3.Database(dbFile);
    db.serialize(function () {
        var projetcs = []
        db.each(
            "SELECT id, name FROM project",
            function (err, data) {
                console.log(data.id + ": " + data.name);
                projetcs.push(data);
            },
            function () {
                successCallback(projetcs);
            }
        );
    });
    db.close();
}