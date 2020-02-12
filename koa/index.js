const Koa = require('koa');
const app = new Koa();

var range = require('koa-range');
var etag = require('koa-etag')
const conditional = require('koa-conditional-get');
app.use(range).use(conditional()).use(etag())

app.use(async ctx => {
  // console.log(ctx.request.header['if-match'])
  // console.log(ctx.response)
  ctx.body = 'Hello World 0123456789';
  // ctx.status = 412
});
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});

app.listen(3003);