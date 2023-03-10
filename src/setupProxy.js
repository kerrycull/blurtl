const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://cryptopotato.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/wp-json/wp/v2",
      },
    })
  );
};
