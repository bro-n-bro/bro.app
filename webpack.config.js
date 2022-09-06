module.exports = {
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify")
            // buffer: false,
            // crypto: false,
            // events: false,
            // path: false,
            // stream: false,
            // string_decoder: false,
        }
    }
}