var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser('23$@#1233124!$!#234234@#$'));
//인자가 키 값이 됨, 서버에서 브라우저로 쿠키를 구울 때 암호화가 된다
//브라우저는 암호화 된 정보를 가지고 있다가, 필요할 때 서버에 암호화 된 데이터를 보내주면 서버가 이 키값을 이용해 복호

var products = {
    1: {title:'The history of web 1'},
    2: {title:'The next web'}
}

// 카트 예제 구현

app.get('/products', function(req, res){
    var output = '';
    for (var name in products){
        output += `
            <li>
                <a href="/cart/${name}">${products[name].title}</a>
            </li>`
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});
app.get('/cart/:id', function(req, res){
    var id = req.params.id;
    if(req.cookies.cart){
        var cart=req.cookies.cart;
    }else{
        var cart = {};
    }
    if(!cart[id]){
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id])+1;
    res.cookie('cart', cart);
    res.send(cart);
})
app.get('/cart', function(req, res){
    var cart = req.cookies.cart;
    if(!cart){
        res.send('Empty!');
    }else{
        var output  = '';
        for (var id in cart){
            output += `<li>${products[id].title} (${cart[id]})<a href="/delete/${id}">delete</a></li>`
        }
    }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>`);
})

app.get('/delete/:id', function(req, res){
    var id = req.params.id;
    var cart = req.cookies.cart;
    if(parseInt(cart[id]) > 0){
        cart[id] = parseInt(cart[id])-1;
    }
    res.cookie('cart', cart);
    res.redirect('/products');
})

//count 증가 쿠키 예제
app.use(cookieParser());
app.get('/count', function (req, res){
    if(req.signedCookies.count){
        var count = parseInt(req.signedCookies.count);
        //암호를 복호화한 것으로 가져온다
    }else{
        var count = 0;
    }
    count = count+1;
    res.cookie('count', count, {signed: true}); //암호화한 상태로 보낸다
    res.send('count : '+count);
})

app.listen(3003, function(){
    console.log('Connected 3003 port!!')
})