var express = require('express');
var session = require('express-session'); //메모리에 세션 정보 저장, 어플리케이션 껐다 키면 세션 정보 날라감 (expres 기본 제공, 실서비스에서는 이렇게 사용 X)
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
import dotenv from "dotenv";
dotenv.config();

var app = express();

//app이 session 모듈을 사용할 수 있도록 use
app.use(bodyParser.urlencoded({extend: false}));
app.use(session({
    secret: '21312421!@#12412312',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
        host: process.env.MySQL_HOST,
        port: process.env.MySQL_Port,
        user: process.env.MySQL_ID,
        password: process.env.MySQL_PWD,
        database: 'o2',
    })
}))

//세션 카운트
app.get('/count', function(req, res){
  if (req.session.count){
      req.session.count++;
  }else {
      req.session.count = 1; //같은 세션을 가진 사람의 count
  }
  res.send('hi session');
})
app.get('/tmp', function (req, res){
    res.send('result: ' + req.session.count);
})

//세션 로그인

app.get('/auth/logout', function(req, res){
    delete req.session.displayName;
    req.session.save(err => {
        if (err) throw err;
        res.redirect(302, '/welcome');
    });
})
app.get('/welcome', function(req, res){
    if(req.session.displayName){
        res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);
    }else{
        res.send(`
            <h1>Welcome</h1>
            <a href="/auth/login">Login</a>
        `);
    }
});

app.post('/auth/login', function(req, res){
    var user = {
        username: 'egoing',
        password: '111',
        displayName: 'Egoing'
    }
    var uname = req.body.username;
    var pwd = req.body.password;

    if(uname === user.username && pwd === user.password){
        req.session.displayName = user.displayName;
        req.session.save(function() {
            res.redirect('/welcome');
        });
    }else{
        res.redirect('/welcome')
    }
})
app.get('/auth/login', function(req, res){
    var output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `;

    res.send(output);
})
app.listen(3003, function (){
    console.log('Connected 3003 port');
})