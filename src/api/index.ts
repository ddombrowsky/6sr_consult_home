#!/usr/bin/env nodejs
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const path = require('path');
const multiparty = require('multiparty');
const fs = require('fs');

let __projectRoot = __dirname + '/../';

import { DBJob } from '../model/dbjob';

// For now, node owns the web server.  It would also be possible to
// run the Angular2 pages using plain-ol' apache, and change the API
// calls to direct to another port where node is running.
let server_port = 9090;

const DBPATH = 'consult.db';

//
// Serve up the Angular2 pages.
//
app.use(express.static(__projectRoot));
app.get('/', function(req: any, res: any) {
    res.sendFile(path.join(__projectRoot + '/index.html'));
});
app.get('/node_modules/*', function(req: any, res: any) {
    res.sendFile(path.join(__projectRoot + '/../' + req.path));
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

app.post('/resume', (req: any, res: any) => {
    let form = new multiparty.Form();
    form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
            res.status(500).send(err);
        }
        if (!files || !files.upfile[0]) {
            return res.status(400).send('No resume was attached');
        }

        let fname = Date().replace(/ /g,'_') + '.json';
        let upload = files.upfile[0];
        let out = fs.createWriteStream(path.join(__dirname, 'tmp', fname));

        let outData = {
            timestamp: Date().toString(),
            fields: fields,
            upload: upload,
        };

        try {
            fs.copyFileSync(upload.path,
                        path.join(__dirname, 'tmp', upload.originalFilename));
            fs.unlinkSync(upload.path);
            res.sendFile('thankyou.html', {root:__dirname});
        } catch (e) {
            out.write('ERROR: ' + e);
            res.status(500).send('Error uploading resume, ' +
                                 'other information saved.');
        }

        out.end(JSON.stringify(outData));
    });
});

//
// Run the server.
//
app.listen(server_port, function() {
    console.log('Server up and running on http://localhost:' + server_port + '/');
});
