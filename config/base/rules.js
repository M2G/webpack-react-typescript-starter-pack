const paths = require('./paths');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || 10000
);

const tsLoader = {
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
  use: [
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true
      }
    },
  ],
};

const jsLoaderRule = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: paths.appSrc,
  use: [{
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
      plugins: [
        [
          require.resolve('babel-plugin-named-asset-import'),
          {
            loaderMap: {
              svg: {
                ReactComponent:
                  '@svgr/webpack?-svgo,+titleProp,+ref![path]',
              },
            },
          },
        ],
        require.resolve('react-refresh/babel'),
      ]
    }
  }]
};

const filesLoaderRule = {
  test: /.(png|svg|jpe?g|gif|ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [{
    loader: require.resolve('file-loader'),
    options: {
      name(file) {
        if (process.env.NODE_ENV === 'development') {
          return '[path][name].[ext]';
        }

        return '[contenthash].[ext]';
      },
    },
  }]
};

const svgLoaderRule = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
};

const rules = [
  jsLoaderRule,
  tsLoader,
  filesLoaderRule,
  svgLoaderRule
];

module.exports = rules;
