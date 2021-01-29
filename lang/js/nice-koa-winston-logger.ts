import crypto from 'crypto'
import Koa, { Context } from 'koa'
import config from 'config'
import ip from 'ip'
import winston from 'winston'
import koaLogger from 'koa-logger'
import { logger as koaWinston } from 'koa2-winston'

type Next = () => Promise<void>
type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'

const isProd = process.env.NODE_ENV === 'production'

// Provide these from config or env vars or package.json or whatever
const version = 'VERSION'
const appName = 'APP_NAME'
const logLevel = 'LOG_LEVEL'

const getDefaultReqId = (): string => {
  try {
    const localIp = ip.toBuffer(ip.address()).toString('hex')
    const semiRandomString = crypto.randomBytes(8).toString('hex')
    return `${semiRandomString}-${localIp}-${appName}`
  } catch {
    return ''
  }
}

// If cloudfront ID exists, use that. Otherwise, generate a default.
const requestIdContext = async (ctx: Context, next: Next): Promise<void> => {
  try {
    const amzId = 'x-amz-cf-id'
    const reqId = ctx.request.get(amzId) || getDefaultReqId()
    ctx.reqId = reqId
    // @ts-ignore
    ctx.request.reqId = reqId
    ctx.response.set('x-trace-id', reqId)
    ctx.response.remove(amzId)
    const logFields = { reqId }
    ctx.log = ctx.log.child(logFields)
    return next()
  } catch {
    return next()
  }
}

// Use instead of console.log
// import { log } ....
// log.warn('whatever')
export const log = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format((info) => {
      info.version = appVersion
      info.app = appName
      return info
    })(),

    winston.format((info) => {
      if (info?.req?.header?.cookie) {
        info.req.header.cookie = 'REDACTED'
      }
      if (info?.req?.header?.cookies) {
        info.req.header.cookies = 'REDACTED'
      }
      if (info?.req?.header?.authorization) {
        info.req.header.authorization = 'REDACTED'
      }
      return info
    })(),

    isProd ? winston.format.json() : winston.format.cli()
  ),
  transports: [new winston.transports.Console()],
})

const setLogger = (app: Koa): void => {
  app.use(
    async (ctx: Context, next: Next): Promise<void> => {
      ctx.log = log
      await next()
    }
  )
}

export default (app: Koa): void => {
  app.on('error', (err: Error): void => {
    log.error(err)
  })

  if (isProd) {
    app.use(requestIdContext)
    if (['info', 'debug', 'trace'].includes(logLevel)) {
      // Don't log all requests if we're only logging at warn, error, or fatal levels
      app.use(
        koaWinston({
          logger: log,
        })
      )
    }
  } else {
    // Easy to read logger for local dev
    app.use(koaLogger())
  }

  setLogger(app)
}
