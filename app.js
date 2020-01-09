var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
//vanilla js rewrite
app.get('/api', function(req, res){
    res.json({
        message: 'welcome to the api'
    });
});
app.post('/api/posts', parseToken, function(req, res){
    jwt.verify(req.token, 'secretkey', function(err, authData){
        if(err){
            res.sendStatus(403); //forbidden error
        } else{
            res.json({
                message: 'post created...',
                authData: authData
            });
            console.log(x)
        }
    });
    });
app.post('/api/login', function(req, res){
    //mock user
    var user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }
    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}/*sets token to expire in 30 seconds*/, function(err, token){
        res.json({token});
    });
    });
//format of token
//authorization: Bearer <access_token>    
//verify token
function parseToken(request, response, next) {
    //get auth header value
    var bearerHeader = request.headers['authorization'];
    //check if berarer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        var bearer = bearerHeader.split(' ');
        //get token from array
        var bearerToken = bearer[1];
        //set the token
        request.token = bearerToken;
        //Next middleware
        next();
    } else {
        //forbidden
        response.sendStatus(403);
    }
};
app.listen(5000, function(){console.log('server started on port 5000')});