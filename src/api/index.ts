#!/usr/bin/env nodejs
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const path = require('path');
const multiparty = require('multiparty');
const fs = require('fs');

let __projectRoot = __dirname + '/../../dist/ussr';

import { DBJob } from '../model/dbjob';

// For now, node owns the web server.  It would also be possible to
// run the Angular2 pages using plain-ol' apache, and change the API
// calls to direct to another port where node is running.
let server_port = 9090;

const DBPATH = 'consult.db';

//
// Serve up the Angular pages.
//
app.use(express.static(__projectRoot));
app.get('/', function(req: any, res: any) {
    res.sendFile(path.join(__projectRoot + '/index.html'));
});
app.get('/node_modules/*', function(req: any, res: any) {
    res.sendFile(path.join(__projectRoot + '/../' + req.path));
});

// stellar toml file
app.get('/.well-known/stellar.toml', function(req: any, res: any) {
    res.header("Content-Type", "text/plain");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
    res.sendFile(path.join(__projectRoot + '/stellar.toml'));
});

//
// Serve up the API.
//

app.get('/api/jobs', function(req: any, res: any) {

    // NOTE: db path is relative to where node is started
    let db = new sqlite3.Database(DBPATH);

    let jobs: any[] = [];

    // query is read-only, no need for serialize().
    // Could use .each here, but why?
    db.all('select id, name, title from jobs order by ord asc',
        function(err: string, rows: any[]) {
            if (err != null) {
                console.error(req.path + ': ' + err);
                return;
            }
            for (let i = 0; i < rows.length; i++) {
                let dbj = new DBJob(rows[i].id,
                                    rows[i].name,
                                    rows[i].title);
                jobs.push(dbj.toPoco());
                // console.log('received from sqlite: ' + rows[i].name);
            }

            // console.log('received ' + jobs.length + ' rows');
            res.json(jobs);
        }
    );

    db.close();
});

app.get('/api/job/:id', function(req: any, res: any) {
    let db = new sqlite3.Database(DBPATH);
    // console.log('retrieving details for job id ' + req.params.id);

    let details: any[] = [];

    db.all('select description, url from job_detail ' +
           'where job_id = ? order by ord asc',
        [ req.params.id ],
        function(err: string, rows: any[]) {
            if (err != null) {
                console.error(req.path + ': ' + err);
                return;
            }
            for (let i = 0; i < rows.length; i++) {
                details.push({
                    desc: rows[i].description,
                    url: rows[i].url
                });
            }

            res.json(details);
        }
    );

    db.close();
});

//
// Run the server.
//
app.listen(server_port, function() {
    console.log('Server up and running on http://localhost:' + server_port + '/');
});
