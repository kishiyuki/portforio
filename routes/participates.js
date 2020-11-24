var express = require('express');
var router = express.Router();
let mysql = require('mysql2');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
});

router.get('/', function(req, res, next){
  var serachname;
  var today = new Date();
  var startday;
  var endday;
  var username[];
  var userid[];
  connection.query('select * from events where event_name = "' + req.body.event_name + '" and event_day = "' + req.body.event_day +'";', function(err, events){
    connection.query('select * from events_students where event_id = ' + events[0].id + ';', function(err, events_students){
      startday = events[0].event_day;
      endday = events[0].end_day;
      if(events_students.length = 1){
        serachname = events_students[0].id;
      } else if(events_students.length > 1){
        serachname = events_students[0].id;
        for(var i = 1; i<events_students.length; i++){
          searchname = searchname + "or id = " + events_students[i].id;
        }
      } else {
        serachname = "20 and id = 30";
      }
    });
  });
  connection.query('select * from users where id = ' + searchname + ';', function(err, users){
    if(users = []){
    } else {
      for(var i = 0; i<users.length; i++){
        username[i] = users[i].user_name;
        userid[i] = users[i].id;
      }
    }
  });
  if (startday.getTime()<=today.getTime() && today.getTime()<=endday.getTime()) {
    res.render('auth/participatestrue', {username,userid});
  } else {
    res.render('auth/participatesfalse', {username,userid});
  }
});
