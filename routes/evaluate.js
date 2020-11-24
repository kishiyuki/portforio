var express = require('express');
var router = express.Router();
let mysql = require('mysql2');
const fs = require("fs");
const { body, validationResult } = require('express-validator');
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
});
router.get('/', function(req, res, next){
  var senderid;
  var receiverid;
  var sender = req.user.name;
  var receiver = req.body.username;
  connection.query('select * from users;', function(err, users) {
    for (i = 0; i < users.length; i++) {
      if(req.user.name == users[i].user_name){
        senderid = users[i].id;
      } else if(req.body.username == users[i].user_name){
        receiverid = users[i].id;
      }
    }
  });
  res.render('auth/evaluate', {sender,senderid,receiver,receiverid});
});

router.post('/', [body("action").not().isEmpty().withMessage("アクションを入力してください。").isNumeric().withMessage("アクションに数字を入力してください。"),
                  body("think").not().isEmpty().withMessage("思考を入力してください。").isNumeric().withMessage("思考に数字を入力してください。"),
                  body("team").not().isEmpty().withMessage("チームを入力してください。").isNumeric().withMessage("チームに数字を入力してください。")
                　],(req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    var senderid;
    var receiverid;
    var sender = req.user.name;
    var receiver = req.body.username;
    connection.query('select * from users;', function(err, users) {
      for (i = 0; i < users.length; i++) {
        if(req.user.name == users[i].user_name){
          senderid = users[i].id;
        } else if(req.body.username == users[i].user_name){
          receiverid = users[i].id;
        }
      }
    });
      res.render('auth/evaluate', {sender,senderid,receiver,receiverid});
    }else {
      connection.query('select * from users;', function(err, users) {
        for (i = 0; i < users.length; i++) {
          if(req.user.name == users[i].user_name){
            senderid = users[i].id;
          } else if(req.body.username == users[i].user_name){
            receiverid = users[i].id;
          }
        }
      });
      var filename;
      var text = req.body.action.toString() + "\n" + req.body.think.toString() + "\n" + req.body.team.toString() + "\n";
      // var frees = "";
      if(req.body.free.length > 1){
        for(var i =0; i<req.body.free.length-1; i++){
          text = text + free[i].toString() + " ";
          // frees = frees + free[i].toString() + "\n";
        }
        text = text + free[req.body.free.length].toString() + "\n";
        // frees = frees + free[req.body.free.length].toString();
      } else if(req.body.free.length = 1){
        text = text + free[0].toString() + "\n";
        // frees = frees + free[0].toString();
      } else{
        text = text + "\n";
      }
      text = text + req.body.comments;
      filename = req.body.senderid.toString()+ "_" + req.body.receiverid.toString() + "_" + req.body.eventid.toString() + ".txt";
      fs.writeFile(filename,text, (err) => {
        if(err){
          console.log("エラーが発生しました。" + err)
          throw err
        }
        else{
          console.log("ファイルが正常に書き出しされました")
          connection.query('select * from evaluate where txtname = "' + filename + '";', function(err, evaluate) {
            if(evaluate = []){
              connection.query('insert into evaluate set ? ;', {
                senderid: req.body.senderid,
                receiverid: req.body.receiverid,
                eventid: req.body.eventid,
                txt: req.body.deadlin,
                created_at: new Date(),
                updated_at: new Date()
              },function(err, success){
                if (err == null) {
            }
        }
      });
});
