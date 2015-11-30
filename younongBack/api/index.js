var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var path=require('path');
var moment = require('moment');
var jwt = require('jwt-simple');
var tokenMgr = require('./lib/token/tokenManager');

var apiModule = module.exports;
apiModule.init = function (app) {

    app.use(logger('dev'));
//    app.use(bodyParser.json());
    app.use(bodyParser.json({limit:'2048kb'}));
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(multer({
        dest: "../app/public/uploads",
        //dest: "app/public/uploads",
//        changeDest: function(dest, req, res) {
//            var appRoot = req.query.app;
//            var month = moment().format('YYYYMM');
//            console.log(dest+"/"+appRoot+"/"+month);
//            return dest+"\\app\\"+month;
//
//        },
        onError: function(error, next) {

        }
    }));
    // app.use(cookieParser());

    require('./lib/mysql/mysql').init();
    // app.use(require("./site/router"));

//    app.all('/api/*', [bodyParser, function(req, res, next){
//
//        var token = (req.body && req.body.access_token || req.header.Authorization);
//        console.log(token);
//
//    }]);
    // Load module routers
    app.use("/api/user", require("./users/router"));
    app.use("/api/orders", require("./orders/router"));
    app.use("/api/goods", require("./goods/router"));
    app.use("/api/addresses",require("./addresses/router"));
    app.use("/api/categories",require("./categories/router"));
    app.use("/api/others",require("./others/router"));


    // FINALLY, use any error handlers
    // app.use(require("./errors/notFound"));

}

