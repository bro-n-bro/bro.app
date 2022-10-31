const webpack = require('webpack')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	transpileDependencies: true,

	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer']
			})
		],
		resolve: {
			fallback: {
				crypto: require.resolve('crypto-browserify')
			}
		}
	}
})
