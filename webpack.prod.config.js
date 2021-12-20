const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static', to: 'static' },
                { from: 'src/assets/toys', to: 'assets/toys' },
                { from: 'src/assets/json', to: 'assets/json' }
            ]
        })
    ]
};
