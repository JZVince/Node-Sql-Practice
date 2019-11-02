const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const csv = require('csv');
const { Client, Pool } = require('pg')
var copyFrom = require('pg-copy-streams').from;
var async = require('async');
const obj = csv();
var pool = new Pool();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multiStatements: true
});

client.connect()

app.get('/sql', (req, res) => {
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
      });
    }
  })
});
console.log('courses_start');
client.query('SELECT NOW()', null)
.then (() => {
  obj.from.path('./data/courses.csv').to.array(function (data) {
    let insert = 'INSERT INTO courses(id, cname, teacher) VALUES($1, $2, $3)';
    client.query('DELETE FROM courses', (err, res) => { if (err) throw err })
    for (var index = 1; index < data.length; index++) {
      let value = [data[index][0], data[index][1], data[index][2]];
      client.query(insert, value, (err, res) => {
        if (err) throw err;
      })
    }
    console.log('courses');
});
})
.then (()=> {

  obj.from.path('./data/marks.csv').to.array(function (data) {
    let insert = 'INSERT INTO marks(test_id, student_id, mark) VALUES($1, $2, $3)';
    client.query('DELETE FROM marks', (err, res) => { if (err) throw err })
    // Clear previous table content
    for (var index = 1; index < data.length; index++) {
      let value = [data[index][0], data[index][1], data[index][2]];
      client.query(insert, value, (err, res) => {
        if (err) throw err;
      })
    }
    return client.query('SELECT * FROM marks' , null, { useArray: true });
  });
})
.then (()=> {

  obj.from.path('./data/students.csv').to.array(function (data) {
    let insert = 'INSERT INTO students(id, sname) VALUES($1, $2)';
    client.query('DELETE FROM students', (err, res) => { if (err) throw err })
    for (var index = 1; index < data.length; index++) {
      let value = [data[index][0], data[index][1]];
      client.query(insert, value, (err, res) => {
        if (err) throw err;
      })
    }
    return client.query('SELECT * FROM students' , null, { useArray: true });
  });
})
.then (()=> {

  obj.from.path('./data/tests.csv').to.array(function (data) {
    let insert = 'INSERT INTO courses(id, course_id, sweight) VALUES($1, $2, $3)';
    client.query('DELETE FROM tests', (err, res) => { if (err) throw err })
    for (var index = 1; index < data.length; index++) {
      let value = [data[index][0], data[index][1], data[index][2]];
      client.query(insert, value, (err, res) => {
        if (err) throw err;
      })
    }
    return client.query('SELECT * FROM tests' , null, { useArray: true });
  })
  res.render('index', {

  });
});

function query(sql, args, options) {
  return new Promise((resolve, reject) => {
      connection.query(sql, args, options, (err, rows) => {
          if (err)
              return reject(err);
          resolve(rows);
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
      connection.end(err => {
          if (err)
              return reject(err);
          resolve();
      });
  });
}


const insert = 'INSERT INTO courses(id, cname, teacher) VALUES($1, $2, $3)';
const value = ['2', 'Math', 'James'];
const select_courses = 'SELECT * FROM courses';
const select_marks = 'SELECT * FROM marks';
const select_students = 'SELECT * FROM students';
const select_tests = 'SELECT * FROM tests';
const drop = 'DROP TABLE marks';
const del = 'DELETE FROM courses'

client.query(select_marks, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows)
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
})
