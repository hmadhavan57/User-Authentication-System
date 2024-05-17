"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _connecthistoryapifallback = require('connect-history-api-fallback'); var _connecthistoryapifallback2 = _interopRequireDefault(_connecthistoryapifallback);
function redirectAll() {
  return {
    name: "rewrite-all",
    configureServer(server) {
      return () => {
        const handler = _connecthistoryapifallback2.default.call(void 0, {
          disableDotRule: true,
          rewrites: [{from: /\/$/, to: () => "/index.html"}]
        });
        server.middlewares.use((req, res, next) => {
          handler(req, res, next);
        });
      };
    }
  };
}


exports.default = redirectAll;
