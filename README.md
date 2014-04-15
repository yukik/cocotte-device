cocotte-device
==============

# はじめに

express用の[express-device](https://www.npmjs.org/package/express-device)を
[Koa](http://koajs.com/)用のミドルウェアにforkしたものです。

デバイス名を判別しsessionに保存します。

# 使用方法

ミドルウェアに設定することで、`this.session.device`を参照する事で
ユーザーエージェントからクライアントのデバイスタイプを取得します

```javascript
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
```