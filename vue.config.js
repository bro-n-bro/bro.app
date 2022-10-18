const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	transpileDependencies: true,

	configureWebpack: {
		resolve: {
			fallback: {
				"crypto": require.resolve('crypto-browserify'),
				// "buffer": false,
				// crypto: false,
				// events: false,
				// path: false,
				// stream: false,
				// string_decoder: false,
			}
		}
	}
})
