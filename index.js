var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.get('/', function(req, res){
    res.sendFile(path.resolve('index.html'));
});

app.get('/static/*', function (req, res) {
    res.sendFile(path.resolve(req.params[0]))
})

io.on('connection', function(socket){
    socket.on('toggle', function(message){
        io.emit('toggle', message);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
