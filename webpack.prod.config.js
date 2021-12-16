const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static', to: 'static' }
            ]
        })
    ]
};
