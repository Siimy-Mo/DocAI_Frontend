/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['www.myperfectresume.com']
    },
    webpack: (config) => {
        // load worker files as a urls with `file-loader`
        config.module.rules.unshift({
            test: /pdf.worker\.(min\.)?js/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        publicPath: '_next/static/worker',
                        outputPath: 'static/worker'
                    }
                }
            ]
        });

        return config;
    }
};

module.exports = nextConfig;
