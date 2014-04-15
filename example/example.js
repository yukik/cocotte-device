'use strict';

var koa = require('koa')
  , app = koa()
  , session = require('koa-sess')
  , device = require('cocotte-device');

app.use(session());
app.use(device);

app.use(function*(next){

	console.log(this.session.device);

	yield next;
});

app.listen(3000);