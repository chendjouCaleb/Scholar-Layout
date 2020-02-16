module.exports = {
    mode: "development",
    entry: {
        "index": "./src/index.ts"

    },
    output: { filename: "[name].js" },
    resolve: { extensions: [".ts", ".js", ".scss"] },
    module: {
        rules: [
            { test: /\.ts/, use: "ts-loader", exclude: [ /node_modules/] },
            { test: /\.scss$/,
                use: [
                    "style-loader", "css-loader", "sass-loader"
                ]}
        ]
    },
    devServer: {
        contentBase: "./webapp",
        port: 4500
    }
};