module.exports = {
    // 基本路径
    publicPath: './',
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    devServer: {
        compress: true, //开启压缩
        proxy: {
            //只要是包含/api的接口都用node做代理，本地请求路径为aixos设置baseUrl和url，例如"mobile/api/course/recommend"`3.9**/77
            '/captcha': {
                target: 'www.taoxuelife.net', //代理的接口
                ws: true,
                changOrigin: true, // 接口跨域
                pathRewrite: {
                    '^/captcha': '/captcha', //路径重写 ''
                },
            },
        },
    },
    //配置对应loader
    configureWebpack: config => {
        config.module.rules.push({
            test: /\.xml$/,
            use: [
                {
                    loader: 'xml-loader',
                    options: {
                        explicitArray: false,
                    },
                },
            ],
        })
    },
}
