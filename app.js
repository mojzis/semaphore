
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , about = require('./routes/about')
  , message = require('./routes/message')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.OPENSHIFT_INTERNAL_PORT || 3000);
app.set('IP', process.env.OPENSHIFT_INTERNAL_IP || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', about.about);
app.post('/message', message.proccessCreate);
app.get('/message/:messageId', message.proccessGet);

http.createServer(app).listen(app.get('port'), app.get('IP'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
