import type { App, BundlerDev } from '@vuepress/core'
import { chalk, logger } from '@vuepress/utils'
import type { BundlerWebpackOptions } from '../types'
import { createDevConfig } from './createDevConfig'
import { createDevServer } from './createDevServer'
import { createDevServerConfig } from './createDevServerConfig'
import { resolvePort } from './resolvePort'

export const createDev = (options: BundlerWebpackOptions): BundlerDev => async (
  app: App
) => {
  // initialize and prepare
  await app.init()
  await app.prepare()

  // create webpack config
  const config = createDevConfig(app, options)
  const webpackConfig = config.toConfig()

  // create webpack-dev-server config
  const serverConfig = createDevServerConfig(app)

  // resolve host and port
  const host = app.options.host
  const port = await resolvePort(app.options.port)

  // create webpack-dev-server
  const server = createDevServer(webpackConfig, serverConfig)

  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        reject(err)
      } else {
        // TODO: print log after webpack compilation
        logger.success(
          `VuePress dev server is listening at ${chalk.cyan(
            `http://${host}:${port}${app.options.base}`
          )}`
        )

        // promisify the close function
        const close = (): Promise<void> =>
          new Promise((resolve) => server.close(resolve))

        // resolve the close function
        resolve(close)
      }
    })
  })
}
