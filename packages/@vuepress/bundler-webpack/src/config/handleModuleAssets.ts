import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack config to handle assets files
 */
export const handleModuleAssets = ({
  app,
  config,
  inlineLimit = 10000,
}: {
  app: App
  config: Config
  inlineLimit?: number
}): void => {
  // images
  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      name: app.env.isProd
        ? `assets/img/[name].[hash:8].[ext]`
        : `assets/img/[name].[ext]`,
    })

  // svg
  // do not base64-inline SVGs.
  // https://github.com/facebookincubator/create-react-app/pull/1180
  config.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader('file-loader')
    .options({
      name: app.env.isProd
        ? `assets/img/[name].[hash:8].[ext]`
        : `assets/img/[name].[ext]`,
    })

  // media
  config.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      name: app.env.isProd
        ? `assets/media/[name].[hash:8].[ext]`
        : `assets/media/[name].[ext]`,
    })

  // fonts
  config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      name: app.env.isProd
        ? `assets/fonts/[name].[hash:8].[ext]`
        : `assets/fonts/[name].[ext]`,
    })
}
