/*
 *	配置文件
 */
var config = module.exports;
var PRODUCTION = process.env.NODE_ENV === "production";
var fs = require('fs');
var path = require('path');

var server = {
	port: process.env.EXPRESS_PORT || 3000,
	ip: "127.0.0.1"
};


config.mysql = {
	port: process.env.MYSQL_PORT || 3306,
	host: process.env.MYSQL_HOST || "120.131.66.174",
	// host: process.env.MYSQL_HOST || "127.0.0.1",
	user: "cartdbuser",
	// user: "root",
	password: "cart@2014",
	// password: "",
	database: "yonong"
};

config.mysql.poolSize = 10;
config.mysql.timeout = 30000;

if(PRODUCTION){
	config.express.ip = "127.0.0.1";
}

config.url_prefix = "public/uploads/";
// config.email
// config.log
