module.exports = function (options) {
  const lazyImports = [
    '@mapbox/node-pre-gyp',
    'mock-aws-s3',
    'aws-sdk',
    'nock',
  ];

  return {
    ...options,
    externals: [
      ...options.externals,
      (context, request, callback) => {
        if (lazyImports.includes(request)) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      },
    ],
  };
};
