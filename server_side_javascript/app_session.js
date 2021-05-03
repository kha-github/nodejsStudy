var express = require('express');
var session = require('express-session'); //메모리에 세션 정보 저장, 어플리케이션 껐다 키면 세션 정보 날라감 (expres 기본 제공, 실서비스에서는 이렇게 사용 X)
var app = express();

//app이 session 모듈을 사용할 수 있도록 use
app.use(session({
    secret: '21312421!@#12412312',
    resave: false,
    saveUninitialized: true
}))

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
app.listen(3003, function (){
    console.log('Connected 3003 port');
})