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
  if (req.user) {
    var eventid = [];
    var eventname = [];
    var eventday = [];
    var dead_line = [];
    var tagid = [];
    var tagname = [];
    var c;
    connection.query("select * from events;", function(err, ev){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events != []){
            for(var i =0; i<ev.length; i++){
              eventid[i] = ev[i].id;
              eventname[i] = ev[i].event_name;
              startday[i] = ev[i].start_day;
              lastday[i] = ev[i].last_day;
              dead_line[i] = ev[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j=0; j<events_tags.length; j++){
                if(ev[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          } else{
          }
          res.render('auth/eventall', {
            eventid,
            eventname,
            startday,
            lastday,
            dead_line,
            tagname,
            tagid
          });
        });
      });
    });
  }else {
    res.redirect('/signin');
  }
});

router.post('/', function(req, res, next){
  var eventid = [];
  var eventname = [];
  var startday = [];
  var lastday = [];
  var dead_line = [];
  var tagid = [];
  var tagname = [];
  var c;
  if(req.body.tags.length > 0){
    var i = 1;
    var a = "'" + req.body.tags[0] + "'";
    for(var j=1; j<req.body.tags.length;j++){
      a = a + ", '" + req.body.tags[j] + "'";
      i++;
    }
    var b = "SELECT * from events e WHERE" + i.toString() + "= (SELECT COUNT(*) from events_tags INNER JOIN tags ON events_tags.tag_id = tags.id WHERE e.id = events_tags.event_id AND tags.tag IN (" + a + "));"
    connection.query(b, function(err, events){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events !=[]){
            for(var i = 0; i<events.length; i++){
              eventid[i] = events[i].id;
              eventname[i] = events[i].event_name;
              startday[i] = events[i].start_day;
              lastday[i] = events[i].last_day;
              dead_line[i] = events[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j = 0; j<events_tags.length; j++){
                if(events[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          } else {
          }
        });
      });
    });
  } else if(req.body.startday != 0 && req.body.lastday !=0){
    connection.query('SELECT * FROM events WHERE start_day BETWEEN "' + req.body.startday + '" AND "' + req.body.lastday.toString() + '";', function(err, events){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events != []){
            for(var i = 0; i<events.length; i++){
              eventid[i] = events[i].id;
              eventname[i] = events[i].event_name;
              startday[i] = events[i].start_day;
              lastday[i] = events[i].last_day;
              dead_line[i] = events[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j = 0; j<events_tags.length; j++){
                if(events[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          }else {
          }
        });
      });
    });
  } else if(req.body.startday != 0 && req.body.lastday == 0){
    connection.query('SELECT * FROM events WHERE start_day >"' + req.body.startday + '";', function(err, events){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events != []){
            for(var i = 0; i<events.length; i++){
              eventid[i] = events[i].id;
              eventname[i] = events[i].event_name;
              startday[i] = events[i].start_day;
              lastday[i] = events[i].last_day;
              dead_line[i] = events[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j = 0; j<events_tags.length; j++){
                if(events[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          }else {
          }
        });
      });
    });
  } else if(req.body.startday == 0 && req.body.lastday !=0){
    connection.query('SELECT * FROM events WHERE start_day BETWEEN "' + new Date() + '" AND "' + req.body.lastday.toString() + '";', function(err, events){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events != []){
            for(var i = 0; i<events.length; i++){
              eventid[i] = events[i].id;
              eventname[i] = events[i].event_name;
              startday[i] = events[i].start_day;
              lastday[i] = events[i].last_day;
              dead_line[i] = events[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j = 0; j<events_tags.length; j++){
                if(events[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          }else {
          }
        });
      });
    });
  } else if(req.body.search != ""){
    connection.query("select * from events where event_name like '" + req.body.serach +"%';", function(err, events){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events != []){
            for(var i = 0; i<events.length; i++){
              eventid[i] = events[i].id;
              eventname[i] = events[i].event_name;
              startday[i] = events[i].start_day;
              lastday[i] = events[i].last_day;
              dead_line[i] = events[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j = 0; j<events_tags.length; j++){
                if(events[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          }else {

          }
        });
      });
    });
  } else {
    connection.query("select * from events;", function(err, ev){
      connection.query('select * from events_tags;', function(err, events_tags){
        connection.query('select * from tags;', function(err, tags){
          if(events != []){
            for(var i =0; i<ev.length; i++){
              eventid[i] = ev[i].id;
              eventname[i] = ev[i].event_name;
              startday[i] = ev[i].start_day;
              lastday[i] = ev[i].last_day;
              dead_line[i] = ev[i].deadline;
              tagid[i] = [];
              tagname[i] = [];
              c = 0;
              for(var j=0; j<events_tags.length; j++){
                if(ev[i].id == events_tags[j].event_id){
                  tagid[i][c] = events_tags[j].tag_id;
                  tagname[i][c] = tags[tagid[i][c]-1].tag;
                  c++;
                }
              }
            }
          } else{
          }
        });
      });
    });
  }
  res.render('auth/eventall', {eventid,eventname,startday,lastday,dead_line,tagname,tagid});
});
module.exports = router;
