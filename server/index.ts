import * as Koa from 'koa';
import * as next from 'next';
import * as Router from 'koa-router'

const port = parseInt(process.env.PORT, 10) || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/page1', async ctx => {
    console.log('if you access page1, pass here')
    await app.render(ctx.req, ctx.res, '/page1', ctx.query)
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    const { req, res, session } = ctx;

    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(console.error)