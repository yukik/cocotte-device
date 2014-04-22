'use strict';

var koa = require('koa');
var app = koa();
var session = require('koa-sess');
var device = require('cocotte-device');

app.use(session());
app.use(device);

app.use(function*(next){

  console.log(this.session.device);

  yield next;

});

app.listen(3000);