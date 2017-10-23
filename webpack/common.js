
const rules = [
        {
            test : /\.css$/,
            exclude : '/node_modules/',
            use: [
                'style-loader',
                'css-loader'
              ]
        },
        {
            test : /\.less$/,
            exclude: '/node_modules/',
            use:[
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        {
            test : /\.json$/,
            exclude : '/node_modules/',
            loader : 'json-loader'
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            exclude : '/node_modules/',
            loader : 'file-loader'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            exclude : '/node_modules/',
            loader : 'file-loader'
        },
        {
            test: /.(js|jsx)$/,
            exclude : '/node_modules/',
            loader : 'babel-loader'
        }
    ]
const plugins = [

]

module.exports = {
    rules,
    plugins
}