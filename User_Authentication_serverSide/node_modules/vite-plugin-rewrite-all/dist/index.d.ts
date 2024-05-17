import { ViteDevServer } from 'vite';

declare function redirectAll(): {
    name: string;
    configureServer(server: ViteDevServer): () => void;
};

export { redirectAll as default };
