const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const mysql = require('mysql');
//connection configurations
const mc = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '',
  database  : 'site_data'
});

mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes');
routes(app);