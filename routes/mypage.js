var express = require('express');
var router = express.Router();
let mysql = require('mysql2');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var eventid = [];
  var eventname = [];
  var startday = [];
  var lastday = [];
  var dead_line = [];
  var tagid = [];
  var tagname = [];
  var c;
	connection.query('select * from users;', function(err, users) {
		if (req.user) {
			let email2 = "";
			let profession2 = "";
      let id2 = 0;
				for (i = 0; i < users.length; i++) {
					if(req.user.name == users[i].user_name){
            id2 = users[i].id;
	          email2 = users[i].email;
						profession2 = users[i].profession;
	        }
				}
				if(profession2 == "school"){
          connection.query('select * from events;', function(err, events){
      		res.render('auth/mypage1', {
        		userName: req.user.name,
        		email: email2
      		});
        });
				} else if(profession2 == "student"){
          connection.query("select * from events_students where student_id like " + id2.toString() + ";", function(err, events){
              if(events.length == 1){
                connection.query("select * from events where id = " + events[0].event_id.toString() + ";", function(err, ev){
                  connection.query('select * from events_tags;', function(err, events_tags){
                    connection.query('select * from tags;', function(err, tags){
                      eventid[0] = ev[0].id;
                      eventname[0] = ev[0].event_name;
                      startday[0] = ev[0].start_day;
                      lastday[0] = ev[0].last_day;
                      dead_line[0] = ev[0].deadline;
                      tagname[0] = [];
                      tagid[0] = [];
                      c = 0;
                      for(var j=0; j<events_tags.length; j++){
                        if(ev[0].id == events_tags[j].event_id){
                          tagid[0][c] = events_tags[j].tag_id;
                          tagname[0][c] = tags[tagid[0][c]-1].tag;
                          c++;
                        }
                      }
                      res.render('auth/mypage2', {
              	         userName: req.user.name,
          	             email: email2,
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
            } else if(events.length >= 2){
                var searchid = events[0].event_id.toString();
                for(var i =1; i<events.length; i++){
                  searchid = searchid + " or id = " + events[i].event_id.toString();
                }
                connection.query("select * from events where id = " + searchid + ";", function(err, ev){
                  connection.query('select * from events_tags;', function(err, events_tags){
                    connection.query('select * from tags;', function(err, tags){
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
                      res.render('auth/mypage2', {
              	         userName: req.user.name,
          	             email: email2,
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
            } else {
              res.render('auth/mypage2', {
                    userName: req.user.name,
                    email: email2,
                    eventid,
                    eventname,
                    startday,
                    lastday,
                    dead_line,
                    tagname,
                    tagid
            });
            }
          });
				} else if(profession2 == "teacher"){
          connection.query("select * from events_teachers where teacher_id like " + id2.toString() + ";", function(err, events){
              if(events.length == 1){
                connection.query("select * from events where id = " + events[0].event_id.toString() + ";", function(err, ev){
                  connection.query('select * from events_tags;', function(err, events_tags){
                    connection.query('select * from tags;', function(err, tags){
                      eventid[0] = ev[0].id;
                      eventname[0] = ev[0].event_name;
                      startday[0] = ev[0].start_day;
                      lastday[0] = ev[0].last_day;
                      dead_line[0] = ev[0].deadline;
                      tagname[0] = [];
                      tagid[0] = [];
                      c = 0;
                      for(var j=0; j<events_tags.length; j++){
                        if(ev[0].id == events_tags[j].event_id){
                          tagid[0][c] = events_tags[j].tag_id;
                          tagname[0][c] = tags[tagid[0][c]-1].tag;
                          c++;
                        }
                      }
                      res.render('auth/mypage2', {
              	         userName: req.user.name,
          	             email: email2,
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
            } else if(events.length >= 2){
                var searchid = events[0].event_id.toString();
                for(var i =1; i<events.length; i++){
                  searchid = searchid + " or id = " + events[i].event_id.toString();
                }
                connection.query("select * from events where id = " + searchid + ";", function(err, ev){
                  connection.query('select * from events_tags;', function(err, events_tags){
                    connection.query('select * from tags;', function(err, tags){
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
                      res.render('auth/mypage2', {
              	         userName: req.user.name,
          	             email: email2,
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
            } else {
              res.render('auth/mypage2', {
                    userName: req.user.name,
                    email: email2,
                    eventid,
                    eventname,
                    startday,
                    lastday,
                    dead_line,
                    tagname,
                    tagid
            });
            }
          });
        } else{
					console.log("いない");
				}
			} else {
				res.redirect('/signin');
			}
	});
});

module.exports = router;
