const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const path = require('path');

const root = 'jamestheshine.github.io';

function sum(arr) {
  let res = 0;
  for (const elem of arr) res += elem;
  return res;
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          import: false,
        },
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/views/pages/img/leavenow.jpg',
          to: 'assets/img/leavenow.jpg',
        }
      ]
    }),
    new HtmlBundlerPlugin({
      entry: {
        'index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/homepageData.js',
        },
        'electromagnet/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/electromagnetData.js',
        },
        'instructions/page2/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/instructions2Data.js',
        },
        'instructions/page3/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/instructions3Data.js',
        },
        'crossbow/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/crossbowData.js',
        },
        'origami/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/origamiData.js',
        },
        'photogallery/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/photogalleryData.js',
        },
        'bibliography/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/bibliographyData.js',
        },
        'sitemap/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/sitemapData.js',
        },
        'rss/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/rssData.js',
        },
        'rss/all.xml': {
          import: 'src/views/partials/rssAll.hbs',
          filename: 'rss/all.xml',
        },
        'archive/news/index': {
          import: 'src/views/pages/index.hbs',
          data: 'src/views/pages/archiveData.js',
        },
      },
      css: {
        inline: false,
      },
      preprocessor: 'handlebars',
      preprocessorOptions: {
        partials: ['src/views/partials'],
        helpers: {
          arraySize: (array) => array.length,
          activeIf: (a, b) => a === b ? 'active' : '',
          getPercent: (votes, answers) => votes / sum(answers.map((a) => a.votes)) * 100,
          getTotalVotes: (answers) => sum(answers.map((a) => a.votes)),
          getRoot: () => root,
        },
      },
    }),
  ],
  mode: 'production',
};
