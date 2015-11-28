var qr = require('qr-image');
var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res) {


  fs.readFile('index.html',function (err, data){



      res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
      res.write(data);
      res.end();
  });
});



app.get('/qr/', function (req, res) {
  var code = qr.image(new Date().toString(), { type: 'svg' });
  res.type('svg');
  code.pipe(res);
});


var server = http.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


///////////// Sockets ///////////
io.on('connection', function(socket){
  console.log('connected');


  socket.on('clicked', function(msg){
    console.log('button clicked');
  });

});
