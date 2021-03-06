// Node module
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Config
import env from '../env';
import paths from '../paths';

const baseConfig: webpack.Configuration = {
  stats: 'minimal',
  target: 'web',
  entry: [paths.client],
  resolve: {
    alias: {
      '@actions': paths.resolveApp('src/client/actions'),
      '@components': paths.resolveApp('src/client/components'),
      '@containers': paths.resolveApp('src/client/containers'),
      '@helpers': paths.resolveApp('src/client/helpers'),
      '@reducers': paths.resolveApp('src/client/reducers'),
      '@epics': paths.resolveApp('src/client/epics'),
      '@routes': paths.resolveApp('src/client/routes'),
      '#lib': paths.resolveApp('src/lib')
    },
    modules: ['node_modules', paths.nodeModules],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            silent: true,
            transpileOnly: true,
            compilerOptions: { target: 'es6', module: 'esnext' }
          }
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: 'url-loader?limit=4096&name=assets/images/[name].[hash:6].[ext]'
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
        use: 'file-loader?limit=100000&name=assets/fonts/[name].[hash:6].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_NAME': JSON.stringify(env.name),
      'process.env.APP_VERSION': JSON.stringify(env.version)
    }),
    new HtmlWebpackPlugin({
      title: env.name,
      template: paths.htmlTemplate,
      favicon: 'public/favicon.ico',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]
};

export default baseConfig;
