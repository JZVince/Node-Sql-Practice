const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const { Client, Pool } = require('pg')
var copyFrom = require('pg-copy-streams').from;
var pool = new Pool();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multiStatements: true
});

client.connect()

fs.readFile('./sql/report.sql', 'utf8', function (err, data) {
  if (err) throw err;

  var sql = data.split(';')
      .filter((element) => {
          return element.length != 0
      })
      .map((element) => {
          if (element.length != 0)
              return element.replace(/\r?\n|\r/g, " ");
      });

  for (var iterator in sql) {
      client.query(sql[iterator], (err, rows) => {
          if (err) throw err;
          else console.log(iterator);
      });
  }
});
/*
pool.connect(function(err, client, done) {
  var stream = client.query(copyFrom('COPY courses FROM STDIN'));
  var fileStream = fs.createReadStream('./data/courses.csv')
  fileStream.on('error', done);
  stream.on('error', done);
  stream.on('end', done);
  fileStream.pipe(stream);
});
*/



