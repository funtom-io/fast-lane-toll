const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = (env, argv) => {
    const filename = process.env.npm_package_name;

    let filenameWithVersion = filename + '-out';

    const config = {
        entry: './src/app.js',
        target: 'node',
        optimization: {
            minimize: false
        },
        module: {
            rules: [
                {
                    exclude: [/node_modules/, /generated/],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ZipPlugin({filename: filenameWithVersion})
        ],
        output: {
            filename: filename + '.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'commonjs2'
        }
    };

    if (argv) {
        switch (argv.mode) {
            case 'development':
                config.devtool = 'eval';
                break;

            case 'production':
                config.devtool = 'source-map';
                break;
        }
    }

    return config;
};