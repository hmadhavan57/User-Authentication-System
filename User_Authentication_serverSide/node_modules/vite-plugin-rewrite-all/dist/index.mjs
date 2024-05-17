// src/index.ts
import history from "connect-history-api-fallback";
function redirectAll() {
  return {
    name: "rewrite-all",
    configureServer(server) {
      return () => {
        const handler = history({
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
export {
  redirectAll as default
};
