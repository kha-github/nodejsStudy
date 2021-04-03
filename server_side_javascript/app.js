var express = require('express');
var app = express();

//get 메소드를 라우터라고 함
//get 메소드가 라우팅을 해줌으로써 요청이 들어오면 연결해준다
app.get('/', function(req, res){ //home에 접속하면 두번재 인자로 넘긴 콜백 함수 실행
    res.send('Hello home page');
});

app.get('/login', function(req, res){ //login에 접속하면 두번재 인자로 넘긴 콜백 함수 실행
    res.send('login please');
});

app.listen(3000, function (){ //누군가가 3000번 포트로 들어오는 것을 감시하다가 접속하면 콜백 함수 실행
    console.log('Connected 3000 port!');
});
