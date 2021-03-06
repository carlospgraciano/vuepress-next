import { createMarkdown } from '@vuepress/markdown'
import { createPluginApi } from '../plugin-api'
import type { App, AppConfig } from '../types'
import { appInit } from './appInit'
import { appPrepare } from './appPrepare'
import { appUse } from './appUse'
import { appUseByConfig } from './appUseByConfig'
import { createAppDir } from './createAppDir'
import { createAppEnv } from './createAppEnv'
import { createAppOptions } from './createAppOptions'
import { createAppVersion } from './createAppVersion'

/**
 * Create vuepress app
 */
export const createApp = (config: AppConfig): App => {
  const version = createAppVersion()
  const options = createAppOptions(config)
  const dir = createAppDir(options)
  const env = createAppEnv(options)
  const markdown = createMarkdown(options.markdown)
  const pluginApi = createPluginApi()

  const app = {
    version,
    options,
    dir,
    env,
    markdown,
    pluginApi,

    use: (...args) => appUse(app, ...args),
    useByConfig: (...args) => appUseByConfig(app, ...args),
    init: () => appInit(app),
    prepare: () => appPrepare(app),
  } as App

  return app
}
