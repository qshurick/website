var bootstrap = require("./src/bootstrap.js");
var express   = require("express");
var app = express();

bootstrap.init(app, 3000);

console.log("Hello!");

bootstrap.say();