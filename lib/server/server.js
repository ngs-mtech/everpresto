'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('../.././config');

var _config2 = _interopRequireDefault(_config);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _clientRoutes = require('.././client/routes');

var _clientRoutes2 = _interopRequireDefault(_clientRoutes);

var _clientComponentsAppAppFooter = require('.././client/components/app/AppFooter');

var _clientComponentsAppAppFooter2 = _interopRequireDefault(_clientComponentsAppAppFooter);

var _modelsUser = require('./models/user');

var _modelsUser2 = _interopRequireDefault(_modelsUser);

var _routesRootRoute = require('./routes/rootRoute');

var _routesRootRoute2 = _interopRequireDefault(_routesRootRoute);

var _routesAuthRoute = require('./routes/authRoute');

var _routesAuthRoute2 = _interopRequireDefault(_routesAuthRoute);

var _routesTimesheetsRoute = require('./routes/timesheetsRoute');

var _routesTimesheetsRoute2 = _interopRequireDefault(_routesTimesheetsRoute);

var app = (0, _express2['default'])();
var port = process.env.PORT || _config2['default'].development.serverPort;
var apiRouter = _express2['default'].Router();

// connect to db
_mongoose2['default'].connect(_config2['default'].development.dbConnectUrl, function (err) {
  if (err) {
    throw err;
  }
});

// sets the view engine to jade and views to be in the views directory
app.set('views', './views');
app.set('view engine', 'jade');

// sets token secret variable
app.set('tokenSecret', _nodeUuid2['default'].v4());

// log requests to the console
app.use((0, _morgan2['default'])('dev'));

// parse data from POST request
app.use(_bodyParser2['default'].urlencoded({ extended: true }));
app.use(_bodyParser2['default'].json());

// parses cookies
app.use((0, _cookieParser2['default'])());

// sets sessions
app.use((0, _expressSession2['default'])({
  secret: 'express session secret',
  resave: true,
  saveUninitalize: false // doesn't both with unauthenticated users
}));

// prefixes all routes call to the server with /api to use express router
app.use('/api', apiRouter);

// api routes
apiRouter.use('/', _routesRootRoute2['default']);
apiRouter.use('/auth', _routesAuthRoute2['default']);
apiRouter.use('/timesheets', _routesTimesheetsRoute2['default']);

// react isomorphic render
app.get('/*', function (req, res) {
  var scriptPath = 'http://localhost:' + _config2['default'].development.webpackPort + '/build/bundle.js';
  var stylePath = 'http://localhost:' + _config2['default'].development.webpackPort + '/build/style.css';
  _reactRouter2['default'].run(_clientRoutes2['default'], req.url, function (Handler) {
    var content = _react2['default'].renderToString(_react2['default'].createElement(Handler, null));
    var footerContent = _react2['default'].renderToString(_react2['default'].createElement(_clientComponentsAppAppFooter2['default'], null));
    res.render('index', {
      stylePath: stylePath,
      scriptPath: scriptPath,
      content: content,
      footerContent: footerContent
    });
  });
});

var server = app.listen(port, function () {
  console.log('App is live and running at http://localhost:', port);
});