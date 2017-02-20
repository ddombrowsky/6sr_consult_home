let express = require('express');
let app = express();
let path = require('path');

let __projectRoot = __dirname + '/../';
let server_port = 3000;

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
    // TODO: make sqlite connection to DB
    res.json([
        {id: 1, name: 'jobname1', title: 'jobtitle2'},
        {id: 2, name: 'jobname2', title: 'jobtitle2'}
    ]);
});

//
// Run the server.
//
app.listen(server_port, function() {
    console.log('Server up and running on http://localhost:' + server_port + '/');
});
